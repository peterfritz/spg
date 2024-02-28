import { ImageResponse } from '@vercel/og';
import generatePassword, { getCharacterSet } from '../../utils/password';

const font = fetch(new URL('../../public/assets/JetBrainsMono-Bold.ttf', import.meta.url)).then(
  (res) => res.arrayBuffer(),
);

const handler = async () => {
  const fontData = await font;

  const password = generatePassword(25, getCharacterSet(['uppercase', 'lowercase', 'numbers', 'symbols']));

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#1a1b1e',
          color: '#c1c2c5',
          fontWeight: 900,
          fontFamily: 'JetBrains Mono',
        }}
      >
        <svg
          width="72"
          height="69,84"
          viewBox="0 0 200 194"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            // position: 'absolute',
            // zIndex: 1,
            // top: -97,
            // left: -100
          }}
        >
          <path d="M62.2711 194L23.4432 166.811L34.7985 150.277C38.9499 144.398 44.0781 138.641 50.1831 133.008C56.2882 127.374 62.3932 122.23 68.4982 117.576C74.8474 112.677 80.2198 108.758 84.6154 105.818L83.8828 104.348C78.5104 104.348 71.917 104.226 64.1026 103.981C56.2882 103.491 48.3516 102.634 40.293 101.409C32.2344 100.184 25.0305 98.4697 18.6813 96.2651L0 89.2841L16.1172 44.4583L35.1648 51.4394C41.514 53.6439 48.1074 56.9508 54.9451 61.3598C61.7827 65.7689 68.254 70.423 74.359 75.322C80.7082 79.976 85.9585 84.1401 90.1099 87.8144L91.9414 86.3447C90.232 81.2007 88.0342 74.8321 85.348 67.2386C82.906 59.6452 80.7082 51.6843 78.7546 43.3561C77.0452 35.0278 76.1905 27.3119 76.1905 20.2083V0H123.81V20.2083C123.81 27.3119 122.833 35.0278 120.879 43.3561C119.17 51.6843 117.094 59.6452 114.652 67.2386C112.21 74.8321 110.012 81.2007 108.059 86.3447L109.524 87.447C113.675 83.7727 118.803 79.6086 124.908 74.9545C131.258 70.3005 137.851 65.7689 144.689 61.3598C151.526 56.9508 158.12 53.6439 164.469 51.4394L183.516 44.4583L200 89.2841L180.952 96.2651C174.603 98.4697 167.399 100.184 159.341 101.409C151.526 102.634 143.712 103.491 135.897 103.981C128.327 104.226 121.734 104.348 116.117 104.348L115.385 105.818C119.78 108.758 125.031 112.677 131.136 117.576C137.485 122.23 143.712 127.374 149.817 133.008C156.166 138.641 161.294 144.275 165.201 149.909L176.557 166.811L137.729 194L126.007 177.466C122.1 171.587 118.437 164.729 115.018 156.89C111.844 149.052 109.035 141.336 106.593 133.742C104.396 125.904 102.564 119.413 101.099 114.269H98.9011C97.6801 119.413 95.8486 125.904 93.4066 133.742C90.9646 141.336 88.1563 149.052 84.9817 156.89C81.8071 164.729 78.1441 171.587 73.9927 177.466L62.2711 194Z" fill="#099268" />
        </svg>
        <div style={{
          marginTop: 15,
          fontSize: 50,
        }}
        >
          Secure Password Generator
        </div>
        <div style={{
          marginTop: 15,
          fontSize: 35,
        }}
        >
          { password }
        </div>
      </div>
    ),
    {
      headers: {
        'cache-control': 'no-cache',
      },
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'JetBrains Mono',
          data: fontData,
          style: 'normal',
          weight: 700,
        },
      ],
    },
  );
};

export const config = {
  runtime: 'edge',
};

export default handler;
