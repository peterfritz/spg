import {
  ActionIcon,
  Center, Checkbox, CopyButton, Group, Input, NumberInput, Slider, Space, Stack, TextInput,
} from '@mantine/core';
import { useEffect, useState } from 'react';
import { FaCopy, FaRegCopy } from 'react-icons/fa';
import generatePassword, { characterSets, getCharacterSet } from '../utils/password';

const Home = () => {
  const [length, setLength] = useState(16);
  const [endLength, setEndLength] = useState(length);
  const [password, setPassword] = useState('');
  const [characters, setCharacters] = useState<(keyof typeof characterSets)[]>([
    'uppercase',
    'lowercase',
    'numbers',
    'symbols',
  ]);

  useEffect(() => {
    const newPassword = generatePassword(endLength, getCharacterSet(characters));

    setPassword(newPassword);
  }, [endLength, characters]);

  return (
    <Center
      h="100%"
      p="md"
    >
      <Stack>
        <TextInput
          value={password}
          size="md"
          rightSection={(
            <CopyButton value={password}>
              {({ copied, copy }) => (
                <ActionIcon
                  variant="default"
                  onClick={copy}
                >
                  {copied ? <FaCopy /> : <FaRegCopy />}
                </ActionIcon>
              )}
            </CopyButton>
          )}
          readOnly
        />
        <Checkbox.Group
          label="Character set"
          value={characters}
          onChange={(val: typeof characters) => setCharacters(val)}
          withAsterisk
        >
          <Checkbox value="uppercase" label="Uppercase" />
          <Checkbox value="lowercase" label="Lowercase" />
          <Checkbox value="numbers" label="Numbers" />
          <Checkbox value="symbols" label="Symbols" />
        </Checkbox.Group>
        <Input.Wrapper size="sm">
          <Input.Label required>
            Password length
          </Input.Label>
          <Space h="xs" />
          <Group grow position="apart">
            <NumberInput
              value={length}
              onChange={(val: number) => {
                setLength(val);
                setEndLength(val);
              }}
              autoComplete="off"
              hideControls
              min={8}
              max={128}
              step={1}
              precision={0}
              maw="3.5rem"
              sx={{
                input: {
                  textAlign: 'center',
                },
              }}
            />
            <Slider
              value={length}
              onChange={setLength}
              onChangeEnd={setEndLength}
              maw="100%"
              min={8}
              max={128}
            />
          </Group>
        </Input.Wrapper>
      </Stack>
    </Center>
  );
};

export default Home;
