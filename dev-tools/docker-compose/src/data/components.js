module.exports = [
  {
    distribution: {
      type: 'docker',
      image: 'openintegrationhub/dev-connector:latest',
    },
    isGlobal: true,
    access: 'public',
    name: 'component1',
    description: 'A component just for testing',
    descriptor: {
      replicas: 1,
    },
    owners: [
      {
        id: 't1_admin@local.dev',
        type: 'user',
      },
    ],
  },
  {
    distribution: {
      type: 'docker',
      image: 'openintegrationhub/dev-connector:latest',
    },
    isGlobal: true,
    access: 'public',
    name: 'component2',
    description: 'A component just for testing',
    descriptor: {
      replicas: 1,
    },
    owners: [
      {
        id: 't1_admin@local.dev',
        type: 'user',
      },
    ],
  },
]
