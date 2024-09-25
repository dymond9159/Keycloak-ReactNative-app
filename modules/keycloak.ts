import { RNKeycloak } from '@react-keycloak/native';

const keycloak = new RNKeycloak({
  url: 'https://stagelogin.winkapis.com',
  realm: 'wink',
  clientId: 'sephora',
});

export default keycloak;
