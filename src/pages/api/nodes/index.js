import Cors from 'cors';

import apiMiddleware from 'lib/apiMiddleware';

const cors = apiMiddleware(
  Cors({
    methods: ['GET'],
    origin: 'https://wb.map.sensors.africa',
  })
);

export default async (req, res) => {
  await cors(req, res);

  const token = process.env.NEXT_PUBLIC_MAP_TOKEN;
  const myHeaders = new Headers();

  if (token) {
    myHeaders.append('Authorization', `token ${token}`);
  }

  try {
    const data = await fetch(
      'https://api.sensors.africa/v2/nodes/?format=json',
      {
        headers: myHeaders,
      }
    );

    const dataJson = await data.json();

    if (dataJson.detail === 'Invalid token.') {
      return res.status(403).json('Forbidden');
    }

    return res.status(200).json(dataJson);
  } catch (err) {
    return res.status(500).json(err);
  }
};
