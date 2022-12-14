import { NextRequest } from 'next/server';
import cors from '../../lib/cors';
import generatePassword, { characterSets, getCharacterSet } from '../../utils/password';

const handler = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);

  const length = searchParams.get('length');
  const chars = searchParams.get('chars');

  let pwdLength = !length || !/^\d+$/.test(length) ? 16 : Number(length);

  pwdLength = pwdLength > 128 ? 128 : pwdLength;

  let charSets = chars ? chars.split(',') : ['uppercase', 'lowercase', 'numbers', 'symbols'];

  charSets = charSets.filter((set) => (
    Object.keys(characterSets).includes(set)
  ));

  const password = generatePassword(
    pwdLength,
    getCharacterSet(charSets as (keyof typeof characterSets)[]),
  );

  return cors(
    req,
    new Response(
      JSON.stringify({ password }),
      {
        status: 200,
        headers: {
          'content-type': 'application/json',
        },
      },
    ),
  );
};

export const config = {
  runtime: 'edge',
};

export default handler;
