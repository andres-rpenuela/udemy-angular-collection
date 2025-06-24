import {StoreRoute} from '../interfaces/store-route.interface';

export const storeRoutesData : Record<string, StoreRoute[]> =
  {
    main: [
      { title: 'Home', path: '/' }
    ],
    gender: [
      { title: 'Men', path: '/gender/men' },
      { title: 'Woman', path: '/gender/woman' },
      { title: 'Kid', path: '/gender/kids' }
    ]
  };
