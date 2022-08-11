# Sample project contracts

The sample project sets boilerplate for solidity development with hardhat.

It also contains PiggyBank contract with tests and deploy script.

Check the [development](#development) section for details about various commands and for deployment and verification procedure.

## Development

To setup the environment run `npm install`.

Contracts can be compiled by running `npm run compile`, which will also generate types.

Tests can be run via `npm run test`. This also compiles the contracts if necessary, however, it might happen that tests will fail due to type error since types are not updated in time. If this happens, run tests again or check if tests actually have type errors.

Linting during development can be run by `npm run lint-fix` which will automatically fix some of the issues. Linting covers contracts, tests and scripts, both error checking and coding style. For use in CI's `npm run lint` should be used.

Test coverage can be produced by running `npm run coverage`.

## Deployment and verification

To deploy and verify environmental variables need to be set in the `.env` file. The `.env.sample` can be used as a guide.

PiggyBank contract can be deployed by calling

```console
npx hardhat --network NETWORK run "./scripts/deploy-PiggyBank.ts"
```

The deploy script will print the address to which it was deployed.

PiggyBank contract can be verified by callint

```console
npx hardhat --network NETWORK verify DEPLOYED_ADDRESS
```
