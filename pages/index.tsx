import {
  ActionIcon,
  Button,
  Center,
  Checkbox,
  CopyButton,
  Group,
  Input,
  NumberInput,
  Slider,
  Space,
  Stack,
  TextInput,
} from '@mantine/core';
import {
  useCounter,
  useId,
  useLocalStorage,
} from '@mantine/hooks';
import {
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  FaCheck,
  FaCopy,
  FaLink,
} from 'react-icons/fa';
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

  const [password, setPassword] = useState('');
  const [sliderValue, setSliderValue] = useState(0);

  const lengthInput = useId();
  const [counter, handlers] = useCounter(0);

  const {
    length,
    endLength,
    characters,
    savePreferences,
  } = useMemo(() => ({
    ...preferences,
    endLength: preferences.length,
  }), [preferences]);

  useEffect(() => {
    setSliderValue(length);
  }, [length]);

  const setProperty = <T extends keyof Preferences>(property: T, value: Preferences[T]) => {
    setPreferences((prevState) => ({
      ...prevState,
      [property]: value,
    }));

    if (property === 'length') {
      setSliderValue(value as number);
    }
  };

  const handleSavePreferencesChange = (value: boolean) => {
    setProperty('savePreferences', value);

    setPreferences((prevState) => ({
      ...(value ? prevState : DEFAULT_PREFERENCES),
      savePreferences: value,
    }));
  };

  const apiUrl: string = useMemo(() => {
    if (typeof window === 'undefined') {
      return '';
    }

    const url = new URL(window.location.origin);

    url.pathname = '/api/password';

    url.searchParams.set('length', String(length));
    url.searchParams.set('chars', characters.join(','));

    return url.href;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endLength, characters]);

  useEffect(() => {
    if (!endLength || endLength >= 256) {
      return;
    }

    const newPassword = generatePassword(endLength, getCharacterSet(characters));

    setPassword(newPassword);

    if (savePreferences) {
      if ([
        preferences.length === endLength,
        preferences.characters.sort().join('') === characters.sort().join(''),
        preferences.savePreferences === savePreferences,
      ].every(Boolean)) {
        return;
      }

      setPreferences((prevState) => ({
        ...prevState,
        length: endLength,
        characters,
      }));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
                  {copied ? <FaCheck /> : <FaCopy />}
                </ActionIcon>
              )}
            </CopyButton>
          )}
          readOnly
        />
        <Checkbox.Group
          label="Character set"
          value={characters}
          onChange={(val: Preferences['characters']) => setProperty('characters', val)}
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
                setProperty('length', val);
                setSliderValue(val);
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
              value={sliderValue}
              onChange={(val) => {
                setSliderValue(val);
              }}
              onChangeEnd={(val) => {
                setProperty('length', val);
              }}
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
          <Button.Group>
            <CopyButton value={apiUrl}>
              {({ copied, copy }) => (
                <Button variant="outline" onClick={copy}>
                  {copied ? <FaCheck /> : <FaLink />}
                </Button>
              )}
            </CopyButton>
            <Button
              onClick={() => {
                handlers.increment();
              }}
            >
              Generate
            </Button>
          </Button.Group>
        </Group>
      </Stack>
    </Center>
  );
};

export default Home;
