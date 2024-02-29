import {
  ActionIcon,
  Button,
  Center,
  Checkbox,
  Collapse,
  CopyButton,
  Group,
  Input,
  NumberInput,
  Paper,
  RangeSlider,
  SegmentedControl,
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
import getRandomInteger from '../utils/random';

interface Preferences {
  savePreferences: boolean,
  length: number,
  characters: (keyof typeof characterSets)[],
  randomLength: boolean,
  minLength: number,
  maxLength: number,
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
  randomLength: false,
  minLength: 16,
  maxLength: 128,
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
  const [lengthSliderValue, setLengthSliderValue] = useState(0);
  const [rangeLengthSliderValue, setRangeLengthSliderValue] = useState<[number, number]>([0, 0]);
  const [mode, setMode] = useState<'fixed' | 'random'>('fixed');

  const lengthInput = useId();
  const [counter, handlers] = useCounter(0);

  const {
    length,
    characters,
    randomLength,
    minLength,
    maxLength,
  } = useMemo(() => ({
    ...preferences,
  }), [preferences]);

  useEffect(() => {
    setMode(randomLength ? 'random' : 'fixed');
  }, [randomLength]);

  useEffect(() => {
    setLengthSliderValue(length);
  }, [length]);

  useEffect(() => {
    setRangeLengthSliderValue([
      minLength || 0,
      maxLength || 0,
    ]);
  }, [minLength, maxLength]);

  const setProperty = <T extends keyof Preferences>(property: T, value: Preferences[T]) => {
    setPreferences((prevState) => ({
      ...prevState,
      [property]: value,
    }));
  };

  useEffect(() => {
    if (!length || length >= 256) {
      return;
    }

    const passwordLength = mode === 'random' ? getRandomInteger(minLength, maxLength) : length;

    const newPassword = generatePassword(passwordLength, getCharacterSet(characters));

    setPassword(newPassword);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [length, characters, mode, minLength, maxLength, counter]);

  const apiUrl: string = useMemo(() => {
    if (typeof window === 'undefined') {
      return '';
    }

    const url = new URL(window.location.origin);

    url.pathname = '/api/password';

    if (randomLength) {
      url.searchParams.set('min_length', String(minLength));
      url.searchParams.set('max_length', String(maxLength));
    } else {
      url.searchParams.set('length', String(length));
    }

    url.searchParams.set('chars', characters.join(','));

    return url.href;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [length, characters, mode, minLength, maxLength]);

  return (
    <Center
      h="100%"
      p="md"
    >
      <Stack
        maw="35rem"
        w="100%"
      >
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
        <Input.Wrapper
          label="Character set"
          required
          size="sm"
        >
          <Space h="xs" />
          <Paper
            withBorder
            p="sm"
            radius="sm"
          >
            <Checkbox.Group
              value={characters}
              onChange={(val: Preferences['characters']) => setProperty('characters', val)}
              withAsterisk
              mt={-10}
            >
              <Checkbox value="uppercase" label="Uppercase" />
              <Checkbox value="lowercase" label="Lowercase" />
              <Checkbox value="numbers" label="Numbers" />
              <Checkbox value="symbols" label="Symbols" />
              <Checkbox value="hex" label="Hexadecimal" />
            </Checkbox.Group>
          </Paper>
        </Input.Wrapper>
        <Input.Wrapper
          label="Password length"
          required
          size="sm"
          id={lengthInput}
        >
          <Space h="xs" />
          <SegmentedControl
            color="teal"
            fullWidth
            value={mode}
            onChange={(val) => {
              setProperty('randomLength', val === 'random');
            }}
            data={[
              {
                label: 'Fixed',
                value: 'fixed',
              },
              {
                label: 'Random',
                value: 'random',
              },
            ]}
          />
          <Space h="xs" />
          <Collapse in={mode === 'fixed'}>
            <Group grow position="apart">
              <NumberInput
                value={length}
                onChange={(val: number) => {
                  setProperty('length', val);
                  setLengthSliderValue(val);
                }}
                id={lengthInput}
                autoComplete="off"
                hideControls
                min={3}
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
                value={lengthSliderValue}
                onChange={(val) => {
                  setLengthSliderValue(val);
                }}
                onChangeEnd={(val) => {
                  setProperty('length', val);
                }}
                maw="100%"
                min={3}
                max={128}
              />
            </Group>
          </Collapse>
          <Collapse in={mode === 'random'}>
            <Group position="apart" noWrap>
              <NumberInput
                value={minLength}
                onChange={(val: number) => {
                  setProperty('minLength', val);
                  setProperty('maxLength', maxLength < val + 2 ? val + 2 : maxLength);
                  setRangeLengthSliderValue([
                    val,
                    maxLength < val + 2 ? val + 2 : maxLength,
                  ]);
                }}
                id={lengthInput}
                autoComplete="off"
                hideControls
                min={3}
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
              <RangeSlider
                value={rangeLengthSliderValue}
                onChange={(val) => {
                  setRangeLengthSliderValue(val);
                }}
                onChangeEnd={([min, max]) => {
                  setProperty('minLength', min);
                  setProperty('maxLength', max);
                }}
                maw="100% !important"
                w="100%"
                min={3}
                max={128}
                minRange={2}
              />
              <NumberInput
                value={maxLength}
                onChange={(val: number) => {
                  setProperty('minLength', minLength > val - 2 ? val - 2 : minLength);
                  setProperty('maxLength', val);
                  setRangeLengthSliderValue([
                    minLength > val - 2 ? val - 2 : minLength,
                    val,
                  ]);
                }}
                id={lengthInput}
                autoComplete="off"
                hideControls
                min={3}
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
            </Group>
          </Collapse>
        </Input.Wrapper>
        <Space h="sm" />
        <Button.Group>
          <CopyButton value={apiUrl}>
            {({ copied, copy }) => (
              <Button
                variant="outline"
                onClick={copy}
              >
                {copied ? <FaCheck /> : <FaLink />}
              </Button>
            )}
          </CopyButton>
          <Button
            fullWidth
            onClick={() => {
              handlers.increment();
            }}
          >
            Generate
          </Button>
        </Button.Group>
      </Stack>
    </Center>
  );
};

export default Home;
