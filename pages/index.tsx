import {
  ActionIcon,
  Button,
  Center, Checkbox, CopyButton, Group, Input, NumberInput, Slider, Space, Stack,
  TextInput,
} from '@mantine/core';
import { useCounter, useId, useLocalStorage } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import { FaCopy, FaRegCopy } from 'react-icons/fa';
import generatePassword, { characterSets, getCharacterSet } from '../utils/password';

interface Preferences {
  savePreferences: boolean,
  length: number,
  characters: (keyof typeof characterSets)[],
}

const DEFAULT_PREFERENCES: Preferences = {
  savePreferences: true,
  length: 16,
  characters: [
    'uppercase',
    'lowercase',
    'numbers',
    'symbols',
  ],
};

const Home = () => {
  const [preferences, setPreferences] = useLocalStorage<Preferences>({
    key: 'preferences',
    defaultValue: DEFAULT_PREFERENCES,
    serialize: (value) => (
      JSON.stringify(value)
    ),
    deserialize: (localStorageValue) => (
      JSON.parse(localStorageValue)
    ),
    getInitialValueInEffect: false,
  });

  const [savePreferences, setSavePreferences] = useState(preferences.savePreferences);
  const [length, setLength] = useState(preferences.length);
  const [endLength, setEndLength] = useState(preferences.length);
  const [password, setPassword] = useState('');
  const [characters, setCharacters] = useState(preferences.characters);

  const lengthInput = useId();
  const [counter, handlers] = useCounter(0);

  const handleSavePreferencesChange = (value: boolean) => {
    setSavePreferences(value);

    setPreferences((prevState) => ({
      ...(value ? prevState : DEFAULT_PREFERENCES),
      savePreferences: value,
    }));
  };

  useEffect(() => {
    if (!endLength) {
      return;
    }

    const newPassword = generatePassword(endLength, getCharacterSet(characters));

    setPassword(newPassword);

    if (savePreferences) {
      setPreferences((prevState) => ({
        ...prevState,
        length: endLength,
        characters,
      }));
    }
  }, [savePreferences, endLength, characters, counter]);

  return (
    <Center
      h="100%"
      p="md"
    >
      <Stack>
        <TextInput
          label="Password"
          labelProps={{ size: 'sm' }}
          value={password}
          size="sm"
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
          onChange={(val: Preferences['characters']) => setCharacters(val)}
          withAsterisk
        >
          <Checkbox value="uppercase" label="Uppercase" />
          <Checkbox value="lowercase" label="Lowercase" />
          <Checkbox value="numbers" label="Numbers" />
          <Checkbox value="symbols" label="Symbols" />
        </Checkbox.Group>
        <Input.Wrapper
          label="Password length"
          required
          size="sm"
          id={lengthInput}
        >
          <Space h="xs" />
          <Group grow position="apart">
            <NumberInput
              value={length}
              onChange={(val: number) => {
                setLength(val);
                setEndLength(val);
              }}
              id={lengthInput}
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
        <Space h="sm" />
        <Group position="apart">
          <Checkbox
            label="Save preferences"
            checked={savePreferences}
            onChange={({ currentTarget: { checked } }) => {
              handleSavePreferencesChange(checked);
            }}
          />
          <Button
            onClick={() => {
              handlers.increment();
            }}
          >
            Generate
          </Button>
        </Group>
      </Stack>
    </Center>
  );
};

export default Home;
