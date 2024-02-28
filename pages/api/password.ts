import { NextRequest } from 'next/server';
import { z } from 'zod';
import cors from '../../lib/cors';
import generatePassword, { getCharacterSet } from '../../utils/password';
import getRandomInteger from '../../utils/random';

const MAX_LENGTH = 1024;

const schema = z.object({
  output: z.union([
    z.literal('json'),
    z.literal('text'),
  ]).default('text'),
  chars: z.string().optional().transform((value) => (
    value ? value.split(',') : ['uppercase', 'lowercase', 'numbers', 'symbols']
  )),
  length: z.coerce.number().int().positive().min(1)
    .max(MAX_LENGTH)
    .optional(),
  minLength: z.coerce.number().int().positive().min(1)
    .max(MAX_LENGTH)
    .optional(),
  maxLength: z.coerce.number().int().positive().min(1)
    .max(MAX_LENGTH)
    .optional(),
}).superRefine((data, ctx) => {
  if (data.minLength && data.maxLength && data.minLength > data.maxLength) {
    ctx.addIssue({
      code: 'custom',
      message: 'min_length cannot be greater than max_length',
      path: ['minLength', 'maxLength'],
    });
  }

  if (data.length && (data.minLength || data.maxLength)) {
    ctx.addIssue({
      code: 'custom',
      message: 'length cannot be used with min_length or max_length',
      path: ['length', 'minLength', 'maxLength'],
    });
  }

  if (data.minLength && !data.maxLength) {
    ctx.addIssue({
      code: 'custom',
      message: 'min_length cannot be used without max_length',
      path: ['minLength', 'maxLength'],
    });
  }

  if (data.maxLength && !data.minLength) {
    ctx.addIssue({
      code: 'custom',
      message: 'max_length cannot be used without min_length',
      path: ['minLength', 'maxLength'],
    });
  }
});

const handler = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);

  const result = schema.safeParse({
    output: searchParams.get('output') ?? undefined,
    chars: searchParams.get('chars') ?? undefined,
    length: searchParams.get('length') ?? undefined,
    minLength: searchParams.get('min_length') ?? undefined,
    maxLength: searchParams.get('max_length') ?? undefined,
  });

  if (!result.success) {
    return cors(
      req,
      new Response(
        JSON.stringify({
          error: result.error.issues.map((issue) => (
            issue.message
          )),
        }),
        {
          status: 400,
          headers: {
            'content-type': 'application/json',
          },
        },
      ),
    );
  }

  const {
    output,
    length,
    chars,
    minLength,
    maxLength,
  } = result.data;

  let pwdLength = length || 16;

  if (minLength && maxLength) {
    pwdLength = getRandomInteger(minLength, maxLength);
  }

  const password = generatePassword(
    pwdLength,
    getCharacterSet(chars),
  );

  return cors(
    req,
    new Response(
      output === 'json' ? JSON.stringify({
        password,
        length: pwdLength,
      }) : password,
      {
        status: 200,
        headers: {
          'content-type': output === 'json' ? 'application/json' : 'text/plain',
          'content-disposition': `inline; filename="spg_password_${
            new Date().toISOString().replace(/[:.]/g, '-')
          }.${output === 'json' ? 'json' : 'txt'}"`,
        },
      },
    ),
  );
};

export const config = {
  runtime: 'edge',
};

export default handler;
