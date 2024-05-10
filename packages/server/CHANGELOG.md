# Changelog

## [10.0.1](https://github.com/web3-storage/ucanto/compare/server-v10.0.0...server-v10.0.1) (2024-05-10)


### Bug Fixes

* **server:** loosen requirements on statics ([#353](https://github.com/web3-storage/ucanto/issues/353)) ([6de27c0](https://github.com/web3-storage/ucanto/commit/6de27c0f19790d9def1df2f2e299fa4f0996ded9))

## [10.0.0](https://github.com/web3-storage/ucanto/compare/server-v9.0.1...server-v10.0.0) (2024-04-04)


### ⚠ BREAKING CHANGES

* add support for embedded effects ([#347](https://github.com/web3-storage/ucanto/issues/347))

### Features

* add support for embedded effects ([#347](https://github.com/web3-storage/ucanto/issues/347)) ([58f7c13](https://github.com/web3-storage/ucanto/commit/58f7c13862b9c4581b06f190f25e9d6a0969239a))

## [9.0.1](https://github.com/web3-storage/ucanto/compare/server-v9.0.0...server-v9.0.1) (2023-10-05)


### Bug Fixes

* dependency versions ([#322](https://github.com/web3-storage/ucanto/issues/322)) ([5fdfc4b](https://github.com/web3-storage/ucanto/commit/5fdfc4b1cd61e8f796d704bc1cf82984f25a2e96))

## [9.0.0](https://github.com/web3-storage/ucanto/compare/server-v8.0.2...server-v9.0.0) (2023-10-05)


### Features

* add revocation checker hook ([#320](https://github.com/web3-storage/ucanto/issues/320)) ([0c2dbc6](https://github.com/web3-storage/ucanto/commit/0c2dbc6cdda6bdfad0b1c2ee33eaf37bfd470540))


### Miscellaneous Chores

* release 9.0.0 ([303cc44](https://github.com/web3-storage/ucanto/commit/303cc4429dfb6058ef152eacc50ca146d3546743))

## [8.0.2](https://github.com/web3-storage/ucanto/compare/server-v8.0.1...server-v8.0.2) (2023-08-03)


### Bug Fixes

* add missing dependency on `@ucanto/principal` ([#317](https://github.com/web3-storage/ucanto/issues/317)) ([c62f9c2](https://github.com/web3-storage/ucanto/commit/c62f9c239de4b2a8931b26364d4c401533f2bd93))

## [8.0.1](https://github.com/web3-storage/ucanto/compare/server-v8.0.0...server-v8.0.1) (2023-05-23)


### Bug Fixes

* ensure `@ucanto/server` depends on v8 deps ([#313](https://github.com/web3-storage/ucanto/issues/313)) ([54268cd](https://github.com/web3-storage/ucanto/commit/54268cd47806d789fba7daffd1cdc50ca944833a))

## [8.0.0](https://github.com/web3-storage/ucanto/compare/server-v7.0.2...server-v8.0.0) (2023-05-19)


### ⚠ BREAKING CHANGES

* effects support ([#309](https://github.com/web3-storage/ucanto/issues/309))

### Features

* effects support ([#309](https://github.com/web3-storage/ucanto/issues/309)) ([2a59d8a](https://github.com/web3-storage/ucanto/commit/2a59d8a2fe97325afcdacd5b769c9e88f96488be))

## [7.0.2](https://github.com/web3-storage/ucanto/compare/server-v7.0.1...server-v7.0.2) (2023-04-25)


### Bug Fixes

* error inference of provide ([#291](https://github.com/web3-storage/ucanto/issues/291)) ([5ed3651](https://github.com/web3-storage/ucanto/commit/5ed3651212aa03ecde18154f7bb4c31e52bc60d3))

## [7.0.1](https://github.com/web3-storage/ucanto/compare/server-v7.0.0...server-v7.0.1) (2023-04-25)


### Bug Fixes

* inference of provide function ([#289](https://github.com/web3-storage/ucanto/issues/289)) ([e72af9d](https://github.com/web3-storage/ucanto/commit/e72af9df01e670850115223d7a6bede9d46be9f2))

## [7.0.0](https://github.com/web3-storage/ucanto/compare/server-v0.7.0...server-v7.0.0) (2023-04-11)


### Miscellaneous Chores

* release 7.0.0 ([84e5c48](https://github.com/web3-storage/ucanto/commit/84e5c48141abd9555acc3adc910b00caff36ac44))

## [0.7.0](https://github.com/web3-storage/ucanto/compare/server-v0.7.0...server-v0.7.0) (2023-04-11)


### ⚠ BREAKING CHANGES

* versioned wire transport ([#274](https://github.com/web3-storage/ucanto/issues/274))
* update ucanto to invocation spec compatible result type ([#272](https://github.com/web3-storage/ucanto/issues/272))
* implement invocation receipts ([#266](https://github.com/web3-storage/ucanto/issues/266))
* remove canIssue hook default from the server ([#251](https://github.com/web3-storage/ucanto/issues/251))
* cause release ([#235](https://github.com/web3-storage/ucanto/issues/235))
* update session API ([#227](https://github.com/web3-storage/ucanto/issues/227))
* Use schema stuff in the capabilities instead of custom parsing ([#220](https://github.com/web3-storage/ucanto/issues/220))
* upgrades to multiformats@10 ([#117](https://github.com/web3-storage/ucanto/issues/117))
* switch decoder API to zod like schema API ([#108](https://github.com/web3-storage/ucanto/issues/108))
* upgrade to ucan 0.9 ([#95](https://github.com/web3-storage/ucanto/issues/95))
* update dag-ucan, types and names ([#90](https://github.com/web3-storage/ucanto/issues/90))

### Features

* alight link API with multiformats ([#36](https://github.com/web3-storage/ucanto/issues/36)) ([0ec460e](https://github.com/web3-storage/ucanto/commit/0ec460e43ddda0bb3a3fea8a7881da1463154f36))
* capability provider API ([#34](https://github.com/web3-storage/ucanto/issues/34)) ([ea89f97](https://github.com/web3-storage/ucanto/commit/ea89f97125bb484a12ce3ca09a7884911a9fd4d6))
* cause release ([#235](https://github.com/web3-storage/ucanto/issues/235)) ([168ac01](https://github.com/web3-storage/ucanto/commit/168ac018b51e93998190d3196aec93fe44f082e5))
* cherry pick changes from uploads-v2 demo ([#43](https://github.com/web3-storage/ucanto/issues/43)) ([4308fd2](https://github.com/web3-storage/ucanto/commit/4308fd2f392b9fcccc52af64432dcb04c8257e0b))
* configurable audience handlers ([#257](https://github.com/web3-storage/ucanto/issues/257)) ([f8d001c](https://github.com/web3-storage/ucanto/commit/f8d001cf721b0e96757fa372993f2fe6b6e8d520))
* delgation iterate, more errors and types  ([0606168](https://github.com/web3-storage/ucanto/commit/0606168313d17d66bcc1ad6091440765e1700a4f))
* embedded key resolution ([#168](https://github.com/web3-storage/ucanto/issues/168)) ([5e650f3](https://github.com/web3-storage/ucanto/commit/5e650f376db79c690e4771695d1ff4e6deece40e))
* implement invocation receipts ([#266](https://github.com/web3-storage/ucanto/issues/266)) ([5341416](https://github.com/web3-storage/ucanto/commit/5341416a5f1ba5048c41476bb6c6059556e8e27b))
* implement sync car decode ([#253](https://github.com/web3-storage/ucanto/issues/253)) ([40acaac](https://github.com/web3-storage/ucanto/commit/40acaac52870a68a358370bb1b3a5f4f081943d7))
* refactor into monorepo ([#13](https://github.com/web3-storage/ucanto/issues/13)) ([1f99506](https://github.com/web3-storage/ucanto/commit/1f995064ec6e5953118c2dd1065ee6be959f25b9))
* remove canIssue hook default from the server ([#251](https://github.com/web3-storage/ucanto/issues/251)) ([6e48019](https://github.com/web3-storage/ucanto/commit/6e48019b905787b64b194bc0de0b1cd2c2cc3edc))
* setup pnpm & release-please ([84ac7f1](https://github.com/web3-storage/ucanto/commit/84ac7f12e5a66ee4919fa7527858dc916850e3e0))
* switch decoder API to zod like schema API ([#108](https://github.com/web3-storage/ucanto/issues/108)) ([e2e03ff](https://github.com/web3-storage/ucanto/commit/e2e03ffeb35f00627335dbfd3e128e2cf9dcfdee))
* **ucanto:** capability create / inovke methods ([#51](https://github.com/web3-storage/ucanto/issues/51)) ([ddf56b1](https://github.com/web3-storage/ucanto/commit/ddf56b1ec80ff6c0698255c531936d8eeab532fd))
* **ucanto:** upstream changes from w3 branch ([#54](https://github.com/web3-storage/ucanto/issues/54)) ([861e997](https://github.com/web3-storage/ucanto/commit/861e997e31c2a51195b8384eff5df656b6ec9efc))
* **ucanto:** URI protocol type retention & capability constructors ([e291544](https://github.com/web3-storage/ucanto/commit/e2915447254990d6e2384ff79a1da38120426ed5))
* update dag-ucan, types and names ([#90](https://github.com/web3-storage/ucanto/issues/90)) ([cd792c9](https://github.com/web3-storage/ucanto/commit/cd792c934fbd358d6ccfa5d02f205b14b5f2e14e))
* update multiformats ([#197](https://github.com/web3-storage/ucanto/issues/197)) ([b92a6c6](https://github.com/web3-storage/ucanto/commit/b92a6c6f5c066890a25e62205ff9848b1fb8dde1))
* update session API ([#227](https://github.com/web3-storage/ucanto/issues/227)) ([9bbb2f7](https://github.com/web3-storage/ucanto/commit/9bbb2f796fd57ebe1ecd2112de1927b23a1577bd))
* update ucanto to invocation spec compatible result type ([#272](https://github.com/web3-storage/ucanto/issues/272)) ([b124ed8](https://github.com/web3-storage/ucanto/commit/b124ed8299a94e5a6b5abcb7cd075dd46ac4139d))
* upgrade to ucan 0.9 ([#95](https://github.com/web3-storage/ucanto/issues/95)) ([b752b39](https://github.com/web3-storage/ucanto/commit/b752b398950120d6121badcdbb639f4dc9ce8794))
* upgrades to multiformats@10 ([#117](https://github.com/web3-storage/ucanto/issues/117)) ([61dc4ca](https://github.com/web3-storage/ucanto/commit/61dc4cafece3365bbf60f709265ea71180f226d7))
* Use schema stuff in the capabilities instead of custom parsing ([#220](https://github.com/web3-storage/ucanto/issues/220)) ([8a578ae](https://github.com/web3-storage/ucanto/commit/8a578ae403f7270fc741f8aef07f1d3621fb29f9))
* versioned wire transport ([#274](https://github.com/web3-storage/ucanto/issues/274)) ([25abb67](https://github.com/web3-storage/ucanto/commit/25abb679a05b1f4010cdb949c71537ca2611d9c7))


### Bug Fixes

* .provide inference regression ([#242](https://github.com/web3-storage/ucanto/issues/242)) ([ab155b7](https://github.com/web3-storage/ucanto/commit/ab155b71024878b7f31cddd6031c45a0e8a2fff1))
* build types before publishing ([#71](https://github.com/web3-storage/ucanto/issues/71)) ([04b7958](https://github.com/web3-storage/ucanto/commit/04b79588f77dba234aaf628f62f574b124bd540b))
* downgrade versions ([#158](https://github.com/web3-storage/ucanto/issues/158)) ([f814e75](https://github.com/web3-storage/ucanto/commit/f814e75a89d3ed7c3488a8cb7af8d94f0cfba440))
* optional field validation ([#124](https://github.com/web3-storage/ucanto/issues/124)) ([87b70d2](https://github.com/web3-storage/ucanto/commit/87b70d2d56c07f8257717fa5ef584a21eb0417c8))
* package scripts to build types ([#84](https://github.com/web3-storage/ucanto/issues/84)) ([4d21132](https://github.com/web3-storage/ucanto/commit/4d2113246abdda215dd3fa882730ba71e68b5695))
* reconfigure release-please ([#230](https://github.com/web3-storage/ucanto/issues/230)) ([c16e100](https://github.com/web3-storage/ucanto/commit/c16e10004a5d9f3071f9bfe833e3888851fe4202))
* server verifier to support RSA and ed ([#142](https://github.com/web3-storage/ucanto/issues/142)) ([7317e71](https://github.com/web3-storage/ucanto/commit/7317e7122e105271f50d20d88c8bf2bb3a3d2575))
* **server:** generarting invaild typedefs ([#91](https://github.com/web3-storage/ucanto/issues/91)) ([f528031](https://github.com/web3-storage/ucanto/commit/f528031121e9cd7f17f106c737fafae15f928776))
* trigger releases ([a0d9291](https://github.com/web3-storage/ucanto/commit/a0d9291f9e20456e115fa6c7890cafe937fa511e))
* **ucanto:** capability provider inference ([#52](https://github.com/web3-storage/ucanto/issues/52)) ([4fa6876](https://github.com/web3-storage/ucanto/commit/4fa68762ca69f304515d56f9b658ddba30fb51a7))
* versions ([#131](https://github.com/web3-storage/ucanto/issues/131)) ([88b87a7](https://github.com/web3-storage/ucanto/commit/88b87a7f3a32c02a22ddffcb8f38199445097133))


### Miscellaneous Chores

* release 0.0.1-beta ([d6c7e73](https://github.com/web3-storage/ucanto/commit/d6c7e73de56278e2f2c92c4a0e1a2709c92bcbf9))
* release 0.7.0 ([b3a441d](https://github.com/web3-storage/ucanto/commit/b3a441d4f3d85ab5ae3e2a0331dfacbdd038be23))
* release 4.0.2 ([e9e35df](https://github.com/web3-storage/ucanto/commit/e9e35dffeeb7e5b5e19627f791b66bbdd35d2d11))
* release 4.2.2 ([b92c345](https://github.com/web3-storage/ucanto/commit/b92c3455e0c34f2fc566d00422c19d11c03626f5))
* release 4.2.2 ([fdb5326](https://github.com/web3-storage/ucanto/commit/fdb53260ae2f54cdb8fd9973be5386b36c3af4d0))
* release 4.2.3 ([5dc8158](https://github.com/web3-storage/ucanto/commit/5dc8158341cd668304c94a4b83e1d9b9affae410))
* release 4.3.0 ([b53bf3d](https://github.com/web3-storage/ucanto/commit/b53bf3d9fb582006598aa02ae4c534dfcc68c189))
* release 4.3.1 ([5c76285](https://github.com/web3-storage/ucanto/commit/5c762859c53de307486a8cf5f7c517b24a66d0f4))
* release 4.3.3 ([12ea70b](https://github.com/web3-storage/ucanto/commit/12ea70bbb06d43f7b98017e229f1e1af0dc2fa50))
* release 4.3.4 ([baad652](https://github.com/web3-storage/ucanto/commit/baad652ff7d9760d58bbada161b293e653e6d20e))
* release 4.4.0 ([e47dbfc](https://github.com/web3-storage/ucanto/commit/e47dbfc04b8caa2e3024c960c556251fc5fd9df7))
* release 5.0.0 ([1f809a9](https://github.com/web3-storage/ucanto/commit/1f809a9d41494756e155ffb951864a8b26673642))

## [0.7.0](https://github.com/web3-storage/ucanto/compare/server-v0.7.0...server-v0.7.0) (2023-04-11)


### ⚠ BREAKING CHANGES

* versioned wire transport ([#274](https://github.com/web3-storage/ucanto/issues/274))
* update ucanto to invocation spec compatible result type ([#272](https://github.com/web3-storage/ucanto/issues/272))
* implement invocation receipts ([#266](https://github.com/web3-storage/ucanto/issues/266))
* remove canIssue hook default from the server ([#251](https://github.com/web3-storage/ucanto/issues/251))
* cause release ([#235](https://github.com/web3-storage/ucanto/issues/235))
* update session API ([#227](https://github.com/web3-storage/ucanto/issues/227))
* Use schema stuff in the capabilities instead of custom parsing ([#220](https://github.com/web3-storage/ucanto/issues/220))
* upgrades to multiformats@10 ([#117](https://github.com/web3-storage/ucanto/issues/117))
* switch decoder API to zod like schema API ([#108](https://github.com/web3-storage/ucanto/issues/108))
* upgrade to ucan 0.9 ([#95](https://github.com/web3-storage/ucanto/issues/95))
* update dag-ucan, types and names ([#90](https://github.com/web3-storage/ucanto/issues/90))

### Features

* cause release ([#235](https://github.com/web3-storage/ucanto/issues/235)) ([168ac01](https://github.com/web3-storage/ucanto/commit/168ac018b51e93998190d3196aec93fe44f082e5))
* configurable audience handlers ([#257](https://github.com/web3-storage/ucanto/issues/257)) ([f8d001c](https://github.com/web3-storage/ucanto/commit/f8d001cf721b0e96757fa372993f2fe6b6e8d520))
* embedded key resolution ([#168](https://github.com/web3-storage/ucanto/issues/168)) ([5e650f3](https://github.com/web3-storage/ucanto/commit/5e650f376db79c690e4771695d1ff4e6deece40e))
* implement invocation receipts ([#266](https://github.com/web3-storage/ucanto/issues/266)) ([5341416](https://github.com/web3-storage/ucanto/commit/5341416a5f1ba5048c41476bb6c6059556e8e27b))
* implement sync car decode ([#253](https://github.com/web3-storage/ucanto/issues/253)) ([40acaac](https://github.com/web3-storage/ucanto/commit/40acaac52870a68a358370bb1b3a5f4f081943d7))
* remove canIssue hook default from the server ([#251](https://github.com/web3-storage/ucanto/issues/251)) ([6e48019](https://github.com/web3-storage/ucanto/commit/6e48019b905787b64b194bc0de0b1cd2c2cc3edc))
* switch decoder API to zod like schema API ([#108](https://github.com/web3-storage/ucanto/issues/108)) ([e2e03ff](https://github.com/web3-storage/ucanto/commit/e2e03ffeb35f00627335dbfd3e128e2cf9dcfdee))
* update dag-ucan, types and names ([#90](https://github.com/web3-storage/ucanto/issues/90)) ([cd792c9](https://github.com/web3-storage/ucanto/commit/cd792c934fbd358d6ccfa5d02f205b14b5f2e14e))
* update multiformats ([#197](https://github.com/web3-storage/ucanto/issues/197)) ([b92a6c6](https://github.com/web3-storage/ucanto/commit/b92a6c6f5c066890a25e62205ff9848b1fb8dde1))
* update session API ([#227](https://github.com/web3-storage/ucanto/issues/227)) ([9bbb2f7](https://github.com/web3-storage/ucanto/commit/9bbb2f796fd57ebe1ecd2112de1927b23a1577bd))
* update ucanto to invocation spec compatible result type ([#272](https://github.com/web3-storage/ucanto/issues/272)) ([b124ed8](https://github.com/web3-storage/ucanto/commit/b124ed8299a94e5a6b5abcb7cd075dd46ac4139d))
* upgrade to ucan 0.9 ([#95](https://github.com/web3-storage/ucanto/issues/95)) ([b752b39](https://github.com/web3-storage/ucanto/commit/b752b398950120d6121badcdbb639f4dc9ce8794))
* upgrades to multiformats@10 ([#117](https://github.com/web3-storage/ucanto/issues/117)) ([61dc4ca](https://github.com/web3-storage/ucanto/commit/61dc4cafece3365bbf60f709265ea71180f226d7))
* Use schema stuff in the capabilities instead of custom parsing ([#220](https://github.com/web3-storage/ucanto/issues/220)) ([8a578ae](https://github.com/web3-storage/ucanto/commit/8a578ae403f7270fc741f8aef07f1d3621fb29f9))
* versioned wire transport ([#274](https://github.com/web3-storage/ucanto/issues/274)) ([25abb67](https://github.com/web3-storage/ucanto/commit/25abb679a05b1f4010cdb949c71537ca2611d9c7))


### Bug Fixes

* .provide inference regression ([#242](https://github.com/web3-storage/ucanto/issues/242)) ([ab155b7](https://github.com/web3-storage/ucanto/commit/ab155b71024878b7f31cddd6031c45a0e8a2fff1))
* downgrade versions ([#158](https://github.com/web3-storage/ucanto/issues/158)) ([f814e75](https://github.com/web3-storage/ucanto/commit/f814e75a89d3ed7c3488a8cb7af8d94f0cfba440))
* optional field validation ([#124](https://github.com/web3-storage/ucanto/issues/124)) ([87b70d2](https://github.com/web3-storage/ucanto/commit/87b70d2d56c07f8257717fa5ef584a21eb0417c8))
* reconfigure release-please ([#230](https://github.com/web3-storage/ucanto/issues/230)) ([c16e100](https://github.com/web3-storage/ucanto/commit/c16e10004a5d9f3071f9bfe833e3888851fe4202))
* server verifier to support RSA and ed ([#142](https://github.com/web3-storage/ucanto/issues/142)) ([7317e71](https://github.com/web3-storage/ucanto/commit/7317e7122e105271f50d20d88c8bf2bb3a3d2575))
* **server:** generarting invaild typedefs ([#91](https://github.com/web3-storage/ucanto/issues/91)) ([f528031](https://github.com/web3-storage/ucanto/commit/f528031121e9cd7f17f106c737fafae15f928776))
* trigger releases ([a0d9291](https://github.com/web3-storage/ucanto/commit/a0d9291f9e20456e115fa6c7890cafe937fa511e))
* versions ([#131](https://github.com/web3-storage/ucanto/issues/131)) ([88b87a7](https://github.com/web3-storage/ucanto/commit/88b87a7f3a32c02a22ddffcb8f38199445097133))


### Miscellaneous Chores

* release 0.7.0 ([b3a441d](https://github.com/web3-storage/ucanto/commit/b3a441d4f3d85ab5ae3e2a0331dfacbdd038be23))
* release 4.0.2 ([e9e35df](https://github.com/web3-storage/ucanto/commit/e9e35dffeeb7e5b5e19627f791b66bbdd35d2d11))
* release 4.2.2 ([b92c345](https://github.com/web3-storage/ucanto/commit/b92c3455e0c34f2fc566d00422c19d11c03626f5))
* release 4.2.2 ([fdb5326](https://github.com/web3-storage/ucanto/commit/fdb53260ae2f54cdb8fd9973be5386b36c3af4d0))
* release 4.2.3 ([5dc8158](https://github.com/web3-storage/ucanto/commit/5dc8158341cd668304c94a4b83e1d9b9affae410))
* release 4.3.0 ([b53bf3d](https://github.com/web3-storage/ucanto/commit/b53bf3d9fb582006598aa02ae4c534dfcc68c189))
* release 4.3.1 ([5c76285](https://github.com/web3-storage/ucanto/commit/5c762859c53de307486a8cf5f7c517b24a66d0f4))
* release 4.3.3 ([12ea70b](https://github.com/web3-storage/ucanto/commit/12ea70bbb06d43f7b98017e229f1e1af0dc2fa50))
* release 4.3.4 ([baad652](https://github.com/web3-storage/ucanto/commit/baad652ff7d9760d58bbada161b293e653e6d20e))
* release 4.4.0 ([e47dbfc](https://github.com/web3-storage/ucanto/commit/e47dbfc04b8caa2e3024c960c556251fc5fd9df7))
* release 5.0.0 ([1f809a9](https://github.com/web3-storage/ucanto/commit/1f809a9d41494756e155ffb951864a8b26673642))

## [0.7.0](https://github.com/web3-storage/ucanto/compare/server-v0.7.0...server-v0.7.0) (2023-04-11)


### ⚠ BREAKING CHANGES

* versioned wire transport ([#274](https://github.com/web3-storage/ucanto/issues/274))
* update ucanto to invocation spec compatible result type ([#272](https://github.com/web3-storage/ucanto/issues/272))
* implement invocation receipts ([#266](https://github.com/web3-storage/ucanto/issues/266))
* remove canIssue hook default from the server ([#251](https://github.com/web3-storage/ucanto/issues/251))
* cause release ([#235](https://github.com/web3-storage/ucanto/issues/235))
* update session API ([#227](https://github.com/web3-storage/ucanto/issues/227))
* Use schema stuff in the capabilities instead of custom parsing ([#220](https://github.com/web3-storage/ucanto/issues/220))
* upgrades to multiformats@10 ([#117](https://github.com/web3-storage/ucanto/issues/117))
* switch decoder API to zod like schema API ([#108](https://github.com/web3-storage/ucanto/issues/108))
* upgrade to ucan 0.9 ([#95](https://github.com/web3-storage/ucanto/issues/95))
* update dag-ucan, types and names ([#90](https://github.com/web3-storage/ucanto/issues/90))

### Features

* cause release ([#235](https://github.com/web3-storage/ucanto/issues/235)) ([168ac01](https://github.com/web3-storage/ucanto/commit/168ac018b51e93998190d3196aec93fe44f082e5))
* configurable audience handlers ([#257](https://github.com/web3-storage/ucanto/issues/257)) ([f8d001c](https://github.com/web3-storage/ucanto/commit/f8d001cf721b0e96757fa372993f2fe6b6e8d520))
* embedded key resolution ([#168](https://github.com/web3-storage/ucanto/issues/168)) ([5e650f3](https://github.com/web3-storage/ucanto/commit/5e650f376db79c690e4771695d1ff4e6deece40e))
* implement invocation receipts ([#266](https://github.com/web3-storage/ucanto/issues/266)) ([5341416](https://github.com/web3-storage/ucanto/commit/5341416a5f1ba5048c41476bb6c6059556e8e27b))
* implement sync car decode ([#253](https://github.com/web3-storage/ucanto/issues/253)) ([40acaac](https://github.com/web3-storage/ucanto/commit/40acaac52870a68a358370bb1b3a5f4f081943d7))
* remove canIssue hook default from the server ([#251](https://github.com/web3-storage/ucanto/issues/251)) ([6e48019](https://github.com/web3-storage/ucanto/commit/6e48019b905787b64b194bc0de0b1cd2c2cc3edc))
* switch decoder API to zod like schema API ([#108](https://github.com/web3-storage/ucanto/issues/108)) ([e2e03ff](https://github.com/web3-storage/ucanto/commit/e2e03ffeb35f00627335dbfd3e128e2cf9dcfdee))
* update dag-ucan, types and names ([#90](https://github.com/web3-storage/ucanto/issues/90)) ([cd792c9](https://github.com/web3-storage/ucanto/commit/cd792c934fbd358d6ccfa5d02f205b14b5f2e14e))
* update multiformats ([#197](https://github.com/web3-storage/ucanto/issues/197)) ([b92a6c6](https://github.com/web3-storage/ucanto/commit/b92a6c6f5c066890a25e62205ff9848b1fb8dde1))
* update session API ([#227](https://github.com/web3-storage/ucanto/issues/227)) ([9bbb2f7](https://github.com/web3-storage/ucanto/commit/9bbb2f796fd57ebe1ecd2112de1927b23a1577bd))
* update ucanto to invocation spec compatible result type ([#272](https://github.com/web3-storage/ucanto/issues/272)) ([b124ed8](https://github.com/web3-storage/ucanto/commit/b124ed8299a94e5a6b5abcb7cd075dd46ac4139d))
* upgrade to ucan 0.9 ([#95](https://github.com/web3-storage/ucanto/issues/95)) ([b752b39](https://github.com/web3-storage/ucanto/commit/b752b398950120d6121badcdbb639f4dc9ce8794))
* upgrades to multiformats@10 ([#117](https://github.com/web3-storage/ucanto/issues/117)) ([61dc4ca](https://github.com/web3-storage/ucanto/commit/61dc4cafece3365bbf60f709265ea71180f226d7))
* Use schema stuff in the capabilities instead of custom parsing ([#220](https://github.com/web3-storage/ucanto/issues/220)) ([8a578ae](https://github.com/web3-storage/ucanto/commit/8a578ae403f7270fc741f8aef07f1d3621fb29f9))
* versioned wire transport ([#274](https://github.com/web3-storage/ucanto/issues/274)) ([25abb67](https://github.com/web3-storage/ucanto/commit/25abb679a05b1f4010cdb949c71537ca2611d9c7))


### Bug Fixes

* .provide inference regression ([#242](https://github.com/web3-storage/ucanto/issues/242)) ([ab155b7](https://github.com/web3-storage/ucanto/commit/ab155b71024878b7f31cddd6031c45a0e8a2fff1))
* downgrade versions ([#158](https://github.com/web3-storage/ucanto/issues/158)) ([f814e75](https://github.com/web3-storage/ucanto/commit/f814e75a89d3ed7c3488a8cb7af8d94f0cfba440))
* optional field validation ([#124](https://github.com/web3-storage/ucanto/issues/124)) ([87b70d2](https://github.com/web3-storage/ucanto/commit/87b70d2d56c07f8257717fa5ef584a21eb0417c8))
* reconfigure release-please ([#230](https://github.com/web3-storage/ucanto/issues/230)) ([c16e100](https://github.com/web3-storage/ucanto/commit/c16e10004a5d9f3071f9bfe833e3888851fe4202))
* server verifier to support RSA and ed ([#142](https://github.com/web3-storage/ucanto/issues/142)) ([7317e71](https://github.com/web3-storage/ucanto/commit/7317e7122e105271f50d20d88c8bf2bb3a3d2575))
* **server:** generarting invaild typedefs ([#91](https://github.com/web3-storage/ucanto/issues/91)) ([f528031](https://github.com/web3-storage/ucanto/commit/f528031121e9cd7f17f106c737fafae15f928776))
* trigger releases ([a0d9291](https://github.com/web3-storage/ucanto/commit/a0d9291f9e20456e115fa6c7890cafe937fa511e))
* versions ([#131](https://github.com/web3-storage/ucanto/issues/131)) ([88b87a7](https://github.com/web3-storage/ucanto/commit/88b87a7f3a32c02a22ddffcb8f38199445097133))


### Miscellaneous Chores

* release 0.7.0 ([b3a441d](https://github.com/web3-storage/ucanto/commit/b3a441d4f3d85ab5ae3e2a0331dfacbdd038be23))
* release 4.0.2 ([e9e35df](https://github.com/web3-storage/ucanto/commit/e9e35dffeeb7e5b5e19627f791b66bbdd35d2d11))
* release 4.2.2 ([b92c345](https://github.com/web3-storage/ucanto/commit/b92c3455e0c34f2fc566d00422c19d11c03626f5))
* release 4.2.2 ([fdb5326](https://github.com/web3-storage/ucanto/commit/fdb53260ae2f54cdb8fd9973be5386b36c3af4d0))
* release 4.2.3 ([5dc8158](https://github.com/web3-storage/ucanto/commit/5dc8158341cd668304c94a4b83e1d9b9affae410))
* release 4.3.0 ([b53bf3d](https://github.com/web3-storage/ucanto/commit/b53bf3d9fb582006598aa02ae4c534dfcc68c189))
* release 4.3.1 ([5c76285](https://github.com/web3-storage/ucanto/commit/5c762859c53de307486a8cf5f7c517b24a66d0f4))
* release 4.3.3 ([12ea70b](https://github.com/web3-storage/ucanto/commit/12ea70bbb06d43f7b98017e229f1e1af0dc2fa50))
* release 4.3.4 ([baad652](https://github.com/web3-storage/ucanto/commit/baad652ff7d9760d58bbada161b293e653e6d20e))
* release 4.4.0 ([e47dbfc](https://github.com/web3-storage/ucanto/commit/e47dbfc04b8caa2e3024c960c556251fc5fd9df7))
* release 5.0.0 ([1f809a9](https://github.com/web3-storage/ucanto/commit/1f809a9d41494756e155ffb951864a8b26673642))

## [0.7.0](https://github.com/web3-storage/ucanto/compare/server-v6.1.0...server-v0.7.0) (2023-04-11)


### ⚠ BREAKING CHANGES

* versioned wire transport ([#274](https://github.com/web3-storage/ucanto/issues/274))
* update ucanto to invocation spec compatible result type ([#272](https://github.com/web3-storage/ucanto/issues/272))
* implement invocation receipts ([#266](https://github.com/web3-storage/ucanto/issues/266))

### Features

* implement invocation receipts ([#266](https://github.com/web3-storage/ucanto/issues/266)) ([5341416](https://github.com/web3-storage/ucanto/commit/5341416a5f1ba5048c41476bb6c6059556e8e27b))
* update ucanto to invocation spec compatible result type ([#272](https://github.com/web3-storage/ucanto/issues/272)) ([b124ed8](https://github.com/web3-storage/ucanto/commit/b124ed8299a94e5a6b5abcb7cd075dd46ac4139d))
* versioned wire transport ([#274](https://github.com/web3-storage/ucanto/issues/274)) ([25abb67](https://github.com/web3-storage/ucanto/commit/25abb679a05b1f4010cdb949c71537ca2611d9c7))


### Miscellaneous Chores

* release 0.7.0 ([b3a441d](https://github.com/web3-storage/ucanto/commit/b3a441d4f3d85ab5ae3e2a0331dfacbdd038be23))

## [6.1.0](https://github.com/web3-storage/ucanto/compare/server-v6.0.0...server-v6.1.0) (2023-03-13)


### Features

* configurable audience handlers ([#257](https://github.com/web3-storage/ucanto/issues/257)) ([f8d001c](https://github.com/web3-storage/ucanto/commit/f8d001cf721b0e96757fa372993f2fe6b6e8d520))

## [6.0.0](https://github.com/web3-storage/ucanto/compare/server-v5.0.0...server-v6.0.0) (2023-03-07)


### ⚠ BREAKING CHANGES

* remove canIssue hook default from the server ([#251](https://github.com/web3-storage/ucanto/issues/251))

### Features

* implement sync car decode ([#253](https://github.com/web3-storage/ucanto/issues/253)) ([40acaac](https://github.com/web3-storage/ucanto/commit/40acaac52870a68a358370bb1b3a5f4f081943d7))
* remove canIssue hook default from the server ([#251](https://github.com/web3-storage/ucanto/issues/251)) ([6e48019](https://github.com/web3-storage/ucanto/commit/6e48019b905787b64b194bc0de0b1cd2c2cc3edc))

## [5.0.0](https://github.com/web3-storage/ucanto/compare/server-v4.4.1...server-v5.0.0) (2023-03-01)


### Miscellaneous Chores

* release 5.0.0 ([1f809a9](https://github.com/web3-storage/ucanto/commit/1f809a9d41494756e155ffb951864a8b26673642))

## [4.4.1](https://github.com/web3-storage/ucanto/compare/server-v4.4.0...server-v4.4.1) (2023-03-01)


### Bug Fixes

* .provide inference regression ([#242](https://github.com/web3-storage/ucanto/issues/242)) ([ab155b7](https://github.com/web3-storage/ucanto/commit/ab155b71024878b7f31cddd6031c45a0e8a2fff1))

## [4.4.0](https://github.com/web3-storage/ucanto/compare/server-v4.3.4...server-v4.4.0) (2023-02-28)


### Miscellaneous Chores

* release 4.4.0 ([e47dbfc](https://github.com/web3-storage/ucanto/commit/e47dbfc04b8caa2e3024c960c556251fc5fd9df7))

## [4.3.4](https://github.com/web3-storage/ucanto/compare/server-v4.3.3...server-v4.3.4) (2023-02-28)


### Miscellaneous Chores

* release 4.3.4 ([baad652](https://github.com/web3-storage/ucanto/commit/baad652ff7d9760d58bbada161b293e653e6d20e))

## [4.3.3](https://github.com/web3-storage/ucanto/compare/server-v4.3.1...server-v4.3.3) (2023-02-28)


### Miscellaneous Chores

* release 4.3.3 ([12ea70b](https://github.com/web3-storage/ucanto/commit/12ea70bbb06d43f7b98017e229f1e1af0dc2fa50))

## [4.3.1](https://github.com/web3-storage/ucanto/compare/server-v4.3.0...server-v4.3.1) (2023-02-28)


### ⚠ BREAKING CHANGES

* cause release ([#235](https://github.com/web3-storage/ucanto/issues/235))

### Features

* cause release ([#235](https://github.com/web3-storage/ucanto/issues/235)) ([168ac01](https://github.com/web3-storage/ucanto/commit/168ac018b51e93998190d3196aec93fe44f082e5))


### Miscellaneous Chores

* release 4.3.1 ([5c76285](https://github.com/web3-storage/ucanto/commit/5c762859c53de307486a8cf5f7c517b24a66d0f4))

## [4.3.0](https://github.com/web3-storage/ucanto/compare/server-v4.2.3...server-v4.3.0) (2023-02-28)


### ⚠ BREAKING CHANGES

* update session API ([#227](https://github.com/web3-storage/ucanto/issues/227))
* Use schema stuff in the capabilities instead of custom parsing ([#220](https://github.com/web3-storage/ucanto/issues/220))

### Features

* update session API ([#227](https://github.com/web3-storage/ucanto/issues/227)) ([9bbb2f7](https://github.com/web3-storage/ucanto/commit/9bbb2f796fd57ebe1ecd2112de1927b23a1577bd))
* Use schema stuff in the capabilities instead of custom parsing ([#220](https://github.com/web3-storage/ucanto/issues/220)) ([8a578ae](https://github.com/web3-storage/ucanto/commit/8a578ae403f7270fc741f8aef07f1d3621fb29f9))


### Bug Fixes

* reconfigure release-please ([#230](https://github.com/web3-storage/ucanto/issues/230)) ([c16e100](https://github.com/web3-storage/ucanto/commit/c16e10004a5d9f3071f9bfe833e3888851fe4202))


### Miscellaneous Chores

* release 4.3.0 ([b53bf3d](https://github.com/web3-storage/ucanto/commit/b53bf3d9fb582006598aa02ae4c534dfcc68c189))

### [4.2.3](https://www.github.com/web3-storage/ucanto/compare/server-v4.1.0...server-v4.2.3) (2023-02-08)


### Miscellaneous Chores

* release 4.2.3 ([5dc8158](https://www.github.com/web3-storage/ucanto/commit/5dc8158341cd668304c94a4b83e1d9b9affae410))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @ucanto/core bumped from ^4.1.0 to ^4.2.3
    * @ucanto/interface bumped from ^4.1.0 to ^4.2.3
    * @ucanto/validator bumped from ^4.1.0 to ^4.2.3
  * devDependencies
    * @ucanto/principal bumped from ^4.1.0 to ^4.2.3
    * @ucanto/client bumped from ^4.1.0 to ^4.2.3
    * @ucanto/transport bumped from ^4.1.0 to ^4.2.3

## [4.1.0](https://www.github.com/web3-storage/ucanto/compare/server-v4.0.3...server-v4.1.0) (2023-01-24)


### Features

* update multiformats ([#197](https://www.github.com/web3-storage/ucanto/issues/197)) ([b92a6c6](https://www.github.com/web3-storage/ucanto/commit/b92a6c6f5c066890a25e62205ff9848b1fb8dde1))

## [4.1.0](https://www.github.com/web3-storage/ucanto/compare/server-v4.0.3...server-v4.1.0) (2023-01-18)


### Features

* update multiformats ([#197](https://www.github.com/web3-storage/ucanto/issues/197)) ([b92a6c6](https://www.github.com/web3-storage/ucanto/commit/b92a6c6f5c066890a25e62205ff9848b1fb8dde1))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @ucanto/core bumped from ^4.0.3 to ^4.1.0
    * @ucanto/interface bumped from ^4.0.3 to ^4.1.0
    * @ucanto/validator bumped from ^4.0.3 to ^4.1.0
  * devDependencies
    * @ucanto/principal bumped from ^4.0.3 to ^4.1.0
    * @ucanto/client bumped from ^4.0.3 to ^4.1.0
    * @ucanto/transport bumped from ^4.0.3 to ^4.1.0

### [4.0.3](https://www.github.com/web3-storage/ucanto/compare/server-v4.0.2...server-v4.0.3) (2022-12-14)


### Bug Fixes

* trigger releases ([a0d9291](https://www.github.com/web3-storage/ucanto/commit/a0d9291f9e20456e115fa6c7890cafe937fa511e))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @ucanto/core bumped from ^4.0.2 to ^4.0.3
    * @ucanto/interface bumped from ^4.0.2 to ^4.0.3
    * @ucanto/validator bumped from ^4.0.2 to ^4.0.3
  * devDependencies
    * @ucanto/principal bumped from ^4.0.2 to ^4.0.3
    * @ucanto/client bumped from ^4.0.2 to ^4.0.3
    * @ucanto/transport bumped from ^4.0.2 to ^4.0.3

## [4.0.2](https://github.com/web3-storage/ucanto/compare/server-v4.1.0...server-v4.0.2) (2022-12-14)

### ⚠ BREAKING CHANGES

* upgrades to multiformats@10 ([#117](https://github.com/web3-storage/ucanto/issues/117))
* switch decoder API to zod like schema API ([#108](https://github.com/web3-storage/ucanto/issues/108))
* upgrade to ucan 0.9 ([#95](https://github.com/web3-storage/ucanto/issues/95))
* update dag-ucan, types and names ([#90](https://github.com/web3-storage/ucanto/issues/90))

### Features

* alight link API with multiformats ([#36](https://github.com/web3-storage/ucanto/issues/36)) ([0ec460e](https://github.com/web3-storage/ucanto/commit/0ec460e43ddda0bb3a3fea8a7881da1463154f36))
* capability provider API ([#34](https://github.com/web3-storage/ucanto/issues/34)) ([ea89f97](https://github.com/web3-storage/ucanto/commit/ea89f97125bb484a12ce3ca09a7884911a9fd4d6))
* cherry pick changes from uploads-v2 demo ([#43](https://github.com/web3-storage/ucanto/issues/43)) ([4308fd2](https://github.com/web3-storage/ucanto/commit/4308fd2f392b9fcccc52af64432dcb04c8257e0b))
* delgation iterate, more errors and types  ([0606168](https://github.com/web3-storage/ucanto/commit/0606168313d17d66bcc1ad6091440765e1700a4f))
* embedded key resolution ([#168](https://github.com/web3-storage/ucanto/issues/168)) ([5e650f3](https://github.com/web3-storage/ucanto/commit/5e650f376db79c690e4771695d1ff4e6deece40e))
* refactor into monorepo ([#13](https://github.com/web3-storage/ucanto/issues/13)) ([1f99506](https://github.com/web3-storage/ucanto/commit/1f995064ec6e5953118c2dd1065ee6be959f25b9))
* setup pnpm & release-please ([84ac7f1](https://github.com/web3-storage/ucanto/commit/84ac7f12e5a66ee4919fa7527858dc916850e3e0))
* switch decoder API to zod like schema API ([#108](https://github.com/web3-storage/ucanto/issues/108)) ([e2e03ff](https://github.com/web3-storage/ucanto/commit/e2e03ffeb35f00627335dbfd3e128e2cf9dcfdee))
* **ucanto:** capability create / inovke methods ([#51](https://github.com/web3-storage/ucanto/issues/51)) ([ddf56b1](https://github.com/web3-storage/ucanto/commit/ddf56b1ec80ff6c0698255c531936d8eeab532fd))
* **ucanto:** upstream changes from w3 branch ([#54](https://github.com/web3-storage/ucanto/issues/54)) ([861e997](https://github.com/web3-storage/ucanto/commit/861e997e31c2a51195b8384eff5df656b6ec9efc))
* **ucanto:** URI protocol type retention & capability constructors ([e291544](https://github.com/web3-storage/ucanto/commit/e2915447254990d6e2384ff79a1da38120426ed5))
* update dag-ucan, types and names ([#90](https://github.com/web3-storage/ucanto/issues/90)) ([cd792c9](https://github.com/web3-storage/ucanto/commit/cd792c934fbd358d6ccfa5d02f205b14b5f2e14e))
* upgrade to ucan 0.9 ([#95](https://github.com/web3-storage/ucanto/issues/95)) ([b752b39](https://github.com/web3-storage/ucanto/commit/b752b398950120d6121badcdbb639f4dc9ce8794))
* upgrades to multiformats@10 ([#117](https://github.com/web3-storage/ucanto/issues/117)) ([61dc4ca](https://github.com/web3-storage/ucanto/commit/61dc4cafece3365bbf60f709265ea71180f226d7))


### Bug Fixes

* build types before publishing ([#71](https://github.com/web3-storage/ucanto/issues/71)) ([04b7958](https://github.com/web3-storage/ucanto/commit/04b79588f77dba234aaf628f62f574b124bd540b))
* downgrade versions ([#158](https://github.com/web3-storage/ucanto/issues/158)) ([f814e75](https://github.com/web3-storage/ucanto/commit/f814e75a89d3ed7c3488a8cb7af8d94f0cfba440))
* optional field validation ([#124](https://github.com/web3-storage/ucanto/issues/124)) ([87b70d2](https://github.com/web3-storage/ucanto/commit/87b70d2d56c07f8257717fa5ef584a21eb0417c8))
* package scripts to build types ([#84](https://github.com/web3-storage/ucanto/issues/84)) ([4d21132](https://github.com/web3-storage/ucanto/commit/4d2113246abdda215dd3fa882730ba71e68b5695))
* server verifier to support RSA and ed ([#142](https://github.com/web3-storage/ucanto/issues/142)) ([7317e71](https://github.com/web3-storage/ucanto/commit/7317e7122e105271f50d20d88c8bf2bb3a3d2575))
* **server:** generarting invaild typedefs ([#91](https://github.com/web3-storage/ucanto/issues/91)) ([f528031](https://github.com/web3-storage/ucanto/commit/f528031121e9cd7f17f106c737fafae15f928776))
* **ucanto:** capability provider inference ([#52](https://github.com/web3-storage/ucanto/issues/52)) ([4fa6876](https://github.com/web3-storage/ucanto/commit/4fa68762ca69f304515d56f9b658ddba30fb51a7))
* versions ([#131](https://github.com/web3-storage/ucanto/issues/131)) ([88b87a7](https://github.com/web3-storage/ucanto/commit/88b87a7f3a32c02a22ddffcb8f38199445097133))


### Miscellaneous Chores

* release 0.0.1-beta ([d6c7e73](https://github.com/web3-storage/ucanto/commit/d6c7e73de56278e2f2c92c4a0e1a2709c92bcbf9))
* release 4.0.2 ([e9e35df](https://github.com/web3-storage/ucanto/commit/e9e35dffeeb7e5b5e19627f791b66bbdd35d2d11))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @ucanto/core bumped from ^4.0.3 to ^4.0.2
    * @ucanto/interface bumped from ^4.1.0 to ^4.0.2
    * @ucanto/validator bumped from ^4.1.0 to ^4.0.2
  * devDependencies
    * @ucanto/principal bumped from ^4.1.0 to ^4.0.2
    * @ucanto/client bumped from ^4.0.3 to ^4.0.2
    * @ucanto/transport bumped from ^4.0.3 to ^4.0.2

## [4.1.0](https://github.com/web3-storage/ucanto/compare/server-v4.0.2...server-v4.1.0) (2022-12-14)


### Features

* embedded key resolution ([#168](https://github.com/web3-storage/ucanto/issues/168)) ([5e650f3](https://github.com/web3-storage/ucanto/commit/5e650f376db79c690e4771695d1ff4e6deece40e))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @ucanto/core bumped from ^4.0.2 to ^4.0.3
    * @ucanto/interface bumped from ^4.0.2 to ^4.1.0
    * @ucanto/validator bumped from ^4.0.2 to ^4.1.0
  * devDependencies
    * @ucanto/principal bumped from ^4.0.2 to ^4.1.0
    * @ucanto/client bumped from ^4.0.2 to ^4.0.3
    * @ucanto/transport bumped from ^4.0.2 to ^4.0.3

## [4.0.2](https://github.com/web3-storage/ucanto/compare/server-v4.1.0...server-v4.0.2) (2022-12-14)


### ⚠ BREAKING CHANGES

* upgrades to multiformats@10 ([#117](https://github.com/web3-storage/ucanto/issues/117))
* switch decoder API to zod like schema API ([#108](https://github.com/web3-storage/ucanto/issues/108))
* upgrade to ucan 0.9 ([#95](https://github.com/web3-storage/ucanto/issues/95))
* update dag-ucan, types and names ([#90](https://github.com/web3-storage/ucanto/issues/90))

### Features

* alight link API with multiformats ([#36](https://github.com/web3-storage/ucanto/issues/36)) ([0ec460e](https://github.com/web3-storage/ucanto/commit/0ec460e43ddda0bb3a3fea8a7881da1463154f36))
* capability provider API ([#34](https://github.com/web3-storage/ucanto/issues/34)) ([ea89f97](https://github.com/web3-storage/ucanto/commit/ea89f97125bb484a12ce3ca09a7884911a9fd4d6))
* cherry pick changes from uploads-v2 demo ([#43](https://github.com/web3-storage/ucanto/issues/43)) ([4308fd2](https://github.com/web3-storage/ucanto/commit/4308fd2f392b9fcccc52af64432dcb04c8257e0b))
* delgation iterate, more errors and types  ([0606168](https://github.com/web3-storage/ucanto/commit/0606168313d17d66bcc1ad6091440765e1700a4f))
* embedded key resolution ([#168](https://github.com/web3-storage/ucanto/issues/168)) ([5e650f3](https://github.com/web3-storage/ucanto/commit/5e650f376db79c690e4771695d1ff4e6deece40e))
* refactor into monorepo ([#13](https://github.com/web3-storage/ucanto/issues/13)) ([1f99506](https://github.com/web3-storage/ucanto/commit/1f995064ec6e5953118c2dd1065ee6be959f25b9))
* setup pnpm & release-please ([84ac7f1](https://github.com/web3-storage/ucanto/commit/84ac7f12e5a66ee4919fa7527858dc916850e3e0))
* switch decoder API to zod like schema API ([#108](https://github.com/web3-storage/ucanto/issues/108)) ([e2e03ff](https://github.com/web3-storage/ucanto/commit/e2e03ffeb35f00627335dbfd3e128e2cf9dcfdee))
* **ucanto:** capability create / inovke methods ([#51](https://github.com/web3-storage/ucanto/issues/51)) ([ddf56b1](https://github.com/web3-storage/ucanto/commit/ddf56b1ec80ff6c0698255c531936d8eeab532fd))
* **ucanto:** upstream changes from w3 branch ([#54](https://github.com/web3-storage/ucanto/issues/54)) ([861e997](https://github.com/web3-storage/ucanto/commit/861e997e31c2a51195b8384eff5df656b6ec9efc))
* **ucanto:** URI protocol type retention & capability constructors ([e291544](https://github.com/web3-storage/ucanto/commit/e2915447254990d6e2384ff79a1da38120426ed5))
* update dag-ucan, types and names ([#90](https://github.com/web3-storage/ucanto/issues/90)) ([cd792c9](https://github.com/web3-storage/ucanto/commit/cd792c934fbd358d6ccfa5d02f205b14b5f2e14e))
* upgrade to ucan 0.9 ([#95](https://github.com/web3-storage/ucanto/issues/95)) ([b752b39](https://github.com/web3-storage/ucanto/commit/b752b398950120d6121badcdbb639f4dc9ce8794))
* upgrades to multiformats@10 ([#117](https://github.com/web3-storage/ucanto/issues/117)) ([61dc4ca](https://github.com/web3-storage/ucanto/commit/61dc4cafece3365bbf60f709265ea71180f226d7))


### Bug Fixes

* build types before publishing ([#71](https://github.com/web3-storage/ucanto/issues/71)) ([04b7958](https://github.com/web3-storage/ucanto/commit/04b79588f77dba234aaf628f62f574b124bd540b))
* downgrade versions ([#158](https://github.com/web3-storage/ucanto/issues/158)) ([f814e75](https://github.com/web3-storage/ucanto/commit/f814e75a89d3ed7c3488a8cb7af8d94f0cfba440))
* optional field validation ([#124](https://github.com/web3-storage/ucanto/issues/124)) ([87b70d2](https://github.com/web3-storage/ucanto/commit/87b70d2d56c07f8257717fa5ef584a21eb0417c8))
* package scripts to build types ([#84](https://github.com/web3-storage/ucanto/issues/84)) ([4d21132](https://github.com/web3-storage/ucanto/commit/4d2113246abdda215dd3fa882730ba71e68b5695))
* server verifier to support RSA and ed ([#142](https://github.com/web3-storage/ucanto/issues/142)) ([7317e71](https://github.com/web3-storage/ucanto/commit/7317e7122e105271f50d20d88c8bf2bb3a3d2575))
* **server:** generarting invaild typedefs ([#91](https://github.com/web3-storage/ucanto/issues/91)) ([f528031](https://github.com/web3-storage/ucanto/commit/f528031121e9cd7f17f106c737fafae15f928776))
* **ucanto:** capability provider inference ([#52](https://github.com/web3-storage/ucanto/issues/52)) ([4fa6876](https://github.com/web3-storage/ucanto/commit/4fa68762ca69f304515d56f9b658ddba30fb51a7))
* versions ([#131](https://github.com/web3-storage/ucanto/issues/131)) ([88b87a7](https://github.com/web3-storage/ucanto/commit/88b87a7f3a32c02a22ddffcb8f38199445097133))


### Miscellaneous Chores

* release 0.0.1-beta ([d6c7e73](https://github.com/web3-storage/ucanto/commit/d6c7e73de56278e2f2c92c4a0e1a2709c92bcbf9))
* release 4.0.2 ([e9e35df](https://github.com/web3-storage/ucanto/commit/e9e35dffeeb7e5b5e19627f791b66bbdd35d2d11))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @ucanto/core bumped from ^4.0.3 to ^4.0.2
    * @ucanto/interface bumped from ^4.1.0 to ^4.0.2
    * @ucanto/validator bumped from ^4.1.0 to ^4.0.2
  * devDependencies
    * @ucanto/principal bumped from ^4.1.0 to ^4.0.2
    * @ucanto/client bumped from ^4.0.3 to ^4.0.2
    * @ucanto/transport bumped from ^4.0.3 to ^4.0.2

## [4.1.0](https://github.com/web3-storage/ucanto/compare/server-v4.0.2...server-v4.1.0) (2022-12-14)


### Features

* embedded key resolution ([#168](https://github.com/web3-storage/ucanto/issues/168)) ([5e650f3](https://github.com/web3-storage/ucanto/commit/5e650f376db79c690e4771695d1ff4e6deece40e))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @ucanto/core bumped from ^4.0.2 to ^4.0.3
    * @ucanto/interface bumped from ^4.0.2 to ^4.1.0
    * @ucanto/validator bumped from ^4.0.2 to ^4.1.0
  * devDependencies
    * @ucanto/principal bumped from ^4.0.2 to ^4.1.0
    * @ucanto/client bumped from ^4.0.2 to ^4.0.3
    * @ucanto/transport bumped from ^4.0.2 to ^4.0.3

## [4.0.2](https://github.com/web3-storage/ucanto/compare/server-v4.0.2...server-v4.0.2) (2022-12-02)


### ⚠ BREAKING CHANGES

* upgrades to multiformats@10 (#117)
* switch decoder API to zod like schema API (#108)
* upgrade to ucan 0.9 (#95)
* update dag-ucan, types and names (#90)

### Features

* alight link API with multiformats ([#36](https://github.com/web3-storage/ucanto/issues/36)) ([0ec460e](https://github.com/web3-storage/ucanto/commit/0ec460e43ddda0bb3a3fea8a7881da1463154f36))
* capability provider API ([#34](https://github.com/web3-storage/ucanto/issues/34)) ([ea89f97](https://github.com/web3-storage/ucanto/commit/ea89f97125bb484a12ce3ca09a7884911a9fd4d6))
* cherry pick changes from uploads-v2 demo ([#43](https://github.com/web3-storage/ucanto/issues/43)) ([4308fd2](https://github.com/web3-storage/ucanto/commit/4308fd2f392b9fcccc52af64432dcb04c8257e0b))
* delgation iterate, more errors and types  ([0606168](https://github.com/web3-storage/ucanto/commit/0606168313d17d66bcc1ad6091440765e1700a4f))
* setup pnpm & release-please ([84ac7f1](https://github.com/web3-storage/ucanto/commit/84ac7f12e5a66ee4919fa7527858dc916850e3e0))
* switch decoder API to zod like schema API ([#108](https://github.com/web3-storage/ucanto/issues/108)) ([e2e03ff](https://github.com/web3-storage/ucanto/commit/e2e03ffeb35f00627335dbfd3e128e2cf9dcfdee))
* **ucanto:** capability create / inovke methods ([#51](https://github.com/web3-storage/ucanto/issues/51)) ([ddf56b1](https://github.com/web3-storage/ucanto/commit/ddf56b1ec80ff6c0698255c531936d8eeab532fd))
* **ucanto:** upstream changes from w3 branch ([#54](https://github.com/web3-storage/ucanto/issues/54)) ([861e997](https://github.com/web3-storage/ucanto/commit/861e997e31c2a51195b8384eff5df656b6ec9efc))
* **ucanto:** URI protocol type retention & capability constructors ([e291544](https://github.com/web3-storage/ucanto/commit/e2915447254990d6e2384ff79a1da38120426ed5))
* update dag-ucan, types and names ([#90](https://github.com/web3-storage/ucanto/issues/90)) ([cd792c9](https://github.com/web3-storage/ucanto/commit/cd792c934fbd358d6ccfa5d02f205b14b5f2e14e))
* upgrade to ucan 0.9 ([#95](https://github.com/web3-storage/ucanto/issues/95)) ([b752b39](https://github.com/web3-storage/ucanto/commit/b752b398950120d6121badcdbb639f4dc9ce8794))
* upgrades to multiformats@10 ([#117](https://github.com/web3-storage/ucanto/issues/117)) ([61dc4ca](https://github.com/web3-storage/ucanto/commit/61dc4cafece3365bbf60f709265ea71180f226d7))


### Bug Fixes

* build types before publishing ([#71](https://github.com/web3-storage/ucanto/issues/71)) ([04b7958](https://github.com/web3-storage/ucanto/commit/04b79588f77dba234aaf628f62f574b124bd540b))
* downgrade versions ([#158](https://github.com/web3-storage/ucanto/issues/158)) ([f814e75](https://github.com/web3-storage/ucanto/commit/f814e75a89d3ed7c3488a8cb7af8d94f0cfba440))
* optional field validation ([#124](https://github.com/web3-storage/ucanto/issues/124)) ([87b70d2](https://github.com/web3-storage/ucanto/commit/87b70d2d56c07f8257717fa5ef584a21eb0417c8))
* package scripts to build types ([#84](https://github.com/web3-storage/ucanto/issues/84)) ([4d21132](https://github.com/web3-storage/ucanto/commit/4d2113246abdda215dd3fa882730ba71e68b5695))
* server verifier to support RSA and ed ([#142](https://github.com/web3-storage/ucanto/issues/142)) ([7317e71](https://github.com/web3-storage/ucanto/commit/7317e7122e105271f50d20d88c8bf2bb3a3d2575))
* **server:** generarting invaild typedefs ([#91](https://github.com/web3-storage/ucanto/issues/91)) ([f528031](https://github.com/web3-storage/ucanto/commit/f528031121e9cd7f17f106c737fafae15f928776))
* **ucanto:** capability provider inference ([#52](https://github.com/web3-storage/ucanto/issues/52)) ([4fa6876](https://github.com/web3-storage/ucanto/commit/4fa68762ca69f304515d56f9b658ddba30fb51a7))
* versions ([#131](https://github.com/web3-storage/ucanto/issues/131)) ([88b87a7](https://github.com/web3-storage/ucanto/commit/88b87a7f3a32c02a22ddffcb8f38199445097133))


### Miscellaneous Chores

* release 4.0.2 ([e9e35df](https://github.com/web3-storage/ucanto/commit/e9e35dffeeb7e5b5e19627f791b66bbdd35d2d11))

## [4.0.2](https://github.com/web3-storage/ucanto/compare/server-v3.0.8...server-v4.0.2) (2022-12-02)


### Miscellaneous Chores

* release 4.0.2 ([e9e35df](https://github.com/web3-storage/ucanto/commit/e9e35dffeeb7e5b5e19627f791b66bbdd35d2d11))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @ucanto/core bumped from ^4.0.0 to ^4.0.2
    * @ucanto/interface bumped from ^4.0.0 to ^4.0.2
    * @ucanto/validator bumped from ^4.0.0 to ^4.0.2
  * devDependencies
    * @ucanto/principal bumped from ^4.0.1 to ^4.0.2
    * @ucanto/client bumped from ^4.0.0 to ^4.0.2
    * @ucanto/transport bumped from ^4.0.0 to ^4.0.2

### [3.0.8](https://www.github.com/web3-storage/ucanto/compare/server-v3.0.7...server-v3.0.8) (2022-12-02)


### Bug Fixes

* downgrade versions ([#158](https://www.github.com/web3-storage/ucanto/issues/158)) ([f814e75](https://www.github.com/web3-storage/ucanto/commit/f814e75a89d3ed7c3488a8cb7af8d94f0cfba440))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @ucanto/core bumped from ^3.0.4 to ^3.0.5
    * @ucanto/validator bumped from ^3.0.6 to ^3.0.7
  * devDependencies
    * @ucanto/client bumped from ^3.0.4 to ^3.0.5
    * @ucanto/transport bumped from ^3.0.4 to ^3.0.5

### [3.0.7](https://www.github.com/web3-storage/ucanto/compare/server-v3.0.6...server-v3.0.7) (2022-12-02)


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @ucanto/core bumped from ^3.0.3 to ^3.0.4
    * @ucanto/validator bumped from ^3.0.5 to ^3.0.6
  * devDependencies
    * @ucanto/principal bumped from ^4.0.0 to ^4.0.1
    * @ucanto/client bumped from ^3.0.3 to ^3.0.4
    * @ucanto/transport bumped from ^3.0.3 to ^3.0.4

### [3.0.6](https://www.github.com/web3-storage/ucanto/compare/server-v3.0.5...server-v3.0.6) (2022-12-01)


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @ucanto/core bumped from ^3.0.2 to ^3.0.3
    * @ucanto/interface bumped from ^3.0.1 to ^4.0.0
    * @ucanto/validator bumped from ^3.0.4 to ^3.0.5
  * devDependencies
    * @ucanto/principal bumped from ^3.0.1 to ^4.0.0
    * @ucanto/client bumped from ^3.0.2 to ^3.0.3
    * @ucanto/transport bumped from ^3.0.2 to ^3.0.3

### [3.0.5](https://www.github.com/web3-storage/ucanto/compare/server-v3.0.4...server-v3.0.5) (2022-11-18)


### Bug Fixes

* server verifier to support RSA and ed ([#142](https://www.github.com/web3-storage/ucanto/issues/142)) ([7317e71](https://www.github.com/web3-storage/ucanto/commit/7317e7122e105271f50d20d88c8bf2bb3a3d2575))

### [3.0.4](https://www.github.com/web3-storage/ucanto/compare/server-v3.0.3...server-v3.0.4) (2022-11-12)


### Bug Fixes

* versions ([#131](https://www.github.com/web3-storage/ucanto/issues/131)) ([88b87a7](https://www.github.com/web3-storage/ucanto/commit/88b87a7f3a32c02a22ddffcb8f38199445097133))

### [3.0.3](https://www.github.com/web3-storage/ucanto/compare/server-v3.0.2...server-v3.0.3) (2022-11-12)


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @ucanto/validator bumped from ^3.0.2 to ^3.0.3

### [3.0.2](https://www.github.com/web3-storage/ucanto/compare/server-v3.0.1...server-v3.0.2) (2022-11-11)


### Bug Fixes

* optional field validation ([#124](https://www.github.com/web3-storage/ucanto/issues/124)) ([87b70d2](https://www.github.com/web3-storage/ucanto/commit/87b70d2d56c07f8257717fa5ef584a21eb0417c8))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @ucanto/core bumped from ^3.0.1 to ^3.0.2
    * @ucanto/interface bumped from ^3.0.0 to ^3.0.1
    * @ucanto/validator bumped from ^3.0.1 to ^3.0.2
  * devDependencies
    * @ucanto/principal bumped from ^3.0.0 to ^3.0.1
    * @ucanto/client bumped from ^3.0.1 to ^3.0.2
    * @ucanto/transport bumped from ^3.0.1 to ^3.0.2

### [3.0.1](https://www.github.com/web3-storage/ucanto/compare/server-v3.0.0...server-v3.0.1) (2022-11-02)


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @ucanto/core bumped from ^3.0.0 to ^3.0.1
    * @ucanto/validator bumped from ^3.0.0 to ^3.0.1
  * devDependencies
    * @ucanto/client bumped from ^3.0.0 to ^3.0.1
    * @ucanto/transport bumped from ^3.0.0 to ^3.0.1

## [3.0.0](https://www.github.com/web3-storage/ucanto/compare/server-v2.0.0...server-v3.0.0) (2022-10-20)


### ⚠ BREAKING CHANGES

* upgrades to multiformats@10 (#117)

### Features

* upgrades to multiformats@10 ([#117](https://www.github.com/web3-storage/ucanto/issues/117)) ([61dc4ca](https://www.github.com/web3-storage/ucanto/commit/61dc4cafece3365bbf60f709265ea71180f226d7))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @ucanto/core bumped from ^2.0.0 to ^3.0.0
    * @ucanto/interface bumped from ^2.0.0 to ^3.0.0
    * @ucanto/validator bumped from ^2.0.0 to ^3.0.0
  * devDependencies
    * @ucanto/principal bumped from ^2.0.0 to ^3.0.0
    * @ucanto/client bumped from ^2.0.0 to ^3.0.0
    * @ucanto/transport bumped from ^2.0.0 to ^3.0.0

## [2.0.0](https://www.github.com/web3-storage/ucanto/compare/server-v1.0.2...server-v2.0.0) (2022-10-16)


### ⚠ BREAKING CHANGES

* switch decoder API to zod like schema API (#108)
* upgrade to ucan 0.9 (#95)

### Features

* switch decoder API to zod like schema API ([#108](https://www.github.com/web3-storage/ucanto/issues/108)) ([e2e03ff](https://www.github.com/web3-storage/ucanto/commit/e2e03ffeb35f00627335dbfd3e128e2cf9dcfdee))
* upgrade to ucan 0.9 ([#95](https://www.github.com/web3-storage/ucanto/issues/95)) ([b752b39](https://www.github.com/web3-storage/ucanto/commit/b752b398950120d6121badcdbb639f4dc9ce8794))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @ucanto/core bumped from ^1.0.1 to ^2.0.0
    * @ucanto/interface bumped from ^1.0.0 to ^2.0.0
    * @ucanto/validator bumped from ^1.0.1 to ^2.0.0
  * devDependencies
    * @ucanto/principal bumped from ^1.0.1 to ^2.0.0
    * @ucanto/client bumped from ^1.0.1 to ^2.0.0
    * @ucanto/transport bumped from ^1.0.1 to ^2.0.0

### [1.0.2](https://www.github.com/web3-storage/ucanto/compare/server-v1.0.1...server-v1.0.2) (2022-09-21)


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @ucanto/core bumped from ^1.0.0 to ^1.0.1
    * @ucanto/validator bumped from ^1.0.0 to ^1.0.1
  * devDependencies
    * @ucanto/principal bumped from ^1.0.0 to ^1.0.1
    * @ucanto/client bumped from ^1.0.0 to ^1.0.1
    * @ucanto/transport bumped from ^1.0.0 to ^1.0.1

### [1.0.1](https://www.github.com/web3-storage/ucanto/compare/server-v1.0.0...server-v1.0.1) (2022-09-21)


### Bug Fixes

* **server:** generarting invaild typedefs ([#91](https://www.github.com/web3-storage/ucanto/issues/91)) ([f528031](https://www.github.com/web3-storage/ucanto/commit/f528031121e9cd7f17f106c737fafae15f928776))

## [1.0.0](https://www.github.com/web3-storage/ucanto/compare/server-v0.7.0...server-v1.0.0) (2022-09-14)


### ⚠ BREAKING CHANGES

* update dag-ucan, types and names (#90)

### Features

* update dag-ucan, types and names ([#90](https://www.github.com/web3-storage/ucanto/issues/90)) ([cd792c9](https://www.github.com/web3-storage/ucanto/commit/cd792c934fbd358d6ccfa5d02f205b14b5f2e14e))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @ucanto/core bumped from ^0.6.0 to ^1.0.0
    * @ucanto/interface bumped from ^0.7.0 to ^1.0.0
    * @ucanto/validator bumped from ^0.6.0 to ^1.0.0
  * devDependencies
    * @ucanto/principal bumped from ^0.5.0 to ^1.0.0
    * @ucanto/client bumped from ^0.6.0 to ^1.0.0
    * @ucanto/transport bumped from ^0.7.0 to ^1.0.0

## [0.7.0](https://www.github.com/web3-storage/ucanto/compare/server-v0.6.4...server-v0.7.0) (2022-07-28)


### Features

* delgation iterate, more errors and types  ([0606168](https://www.github.com/web3-storage/ucanto/commit/0606168313d17d66bcc1ad6091440765e1700a4f))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @ucanto/core bumped from ^0.5.4 to ^0.6.0
    * @ucanto/interface bumped from ^0.6.2 to ^0.7.0
    * @ucanto/validator bumped from ^0.5.5 to ^0.6.0
  * devDependencies
    * @ucanto/authority bumped from ^0.4.5 to ^0.5.0
    * @ucanto/client bumped from ^0.5.4 to ^0.6.0
    * @ucanto/transport bumped from ^0.6.3 to ^0.7.0

### [0.6.4](https://www.github.com/web3-storage/ucanto/compare/server-v0.6.3...server-v0.6.4) (2022-07-11)


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @ucanto/core bumped from ^0.5.3 to ^0.5.4
    * @ucanto/validator bumped from ^0.5.4 to ^0.5.5
  * devDependencies
    * @ucanto/client bumped from ^0.5.3 to ^0.5.4
    * @ucanto/transport bumped from ^0.6.2 to ^0.6.3
    * @ucanto/authority bumped from ^0.4.4 to ^0.4.5

### [0.6.3](https://www.github.com/web3-storage/ucanto/compare/server-v0.6.2...server-v0.6.3) (2022-07-01)


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @ucanto/validator bumped from ^0.5.3 to ^0.5.4
  * devDependencies
    * @ucanto/client bumped from ^0.5.2 to ^0.5.3

### [0.6.2](https://www.github.com/web3-storage/ucanto/compare/server-v0.6.1...server-v0.6.2) (2022-07-01)


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @ucanto/interface bumped from ^0.6.1 to ^0.6.2
    * @ucanto/core bumped from ^0.5.2 to ^0.5.3
    * @ucanto/validator bumped from ^0.5.2 to ^0.5.3
  * devDependencies
    * @ucanto/client bumped from ^0.5.1 to ^0.5.2
    * @ucanto/transport bumped from ^0.6.1 to ^0.6.2
    * @ucanto/authority bumped from ^0.4.3 to ^0.4.4

### [0.6.1](https://www.github.com/web3-storage/ucanto/compare/server-v0.6.0...server-v0.6.1) (2022-06-30)


### Bug Fixes

* build types before publishing ([#71](https://www.github.com/web3-storage/ucanto/issues/71)) ([04b7958](https://www.github.com/web3-storage/ucanto/commit/04b79588f77dba234aaf628f62f574b124bd540b))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @ucanto/interface bumped from ^0.6.0 to ^0.6.1
    * @ucanto/core bumped from ^0.5.1 to ^0.5.2
    * @ucanto/validator bumped from ^0.5.1 to ^0.5.2
  * devDependencies
    * @ucanto/client bumped from ^0.5.0 to ^0.5.1
    * @ucanto/transport bumped from ^0.6.0 to ^0.6.1
    * @ucanto/authority bumped from ^0.4.2 to ^0.4.3

## [0.6.0](https://www.github.com/web3-storage/ucanto/compare/server-v0.5.0...server-v0.6.0) (2022-06-24)


### Features

* **ucanto:** upstream changes from w3 branch ([#54](https://www.github.com/web3-storage/ucanto/issues/54)) ([861e997](https://www.github.com/web3-storage/ucanto/commit/861e997e31c2a51195b8384eff5df656b6ec9efc))


### Bug Fixes

* **ucanto:** capability provider inference ([#52](https://www.github.com/web3-storage/ucanto/issues/52)) ([4fa6876](https://www.github.com/web3-storage/ucanto/commit/4fa68762ca69f304515d56f9b658ddba30fb51a7))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @ucanto/interface bumped from ^0.5.0 to ^0.6.0
    * @ucanto/core bumped from ^0.5.0 to ^0.5.1
    * @ucanto/validator bumped from ^0.5.0 to ^0.5.1
  * devDependencies
    * @ucanto/client bumped from ^0.4.0 to ^0.5.0
    * @ucanto/transport bumped from ^0.5.0 to ^0.6.0
    * @ucanto/authority bumped from ^0.4.1 to ^0.4.2

## [0.5.0](https://www.github.com/web3-storage/ucanto/compare/server-v0.4.0...server-v0.5.0) (2022-06-23)


### Features

* **ucanto:** capability create / inovke methods ([#51](https://www.github.com/web3-storage/ucanto/issues/51)) ([ddf56b1](https://www.github.com/web3-storage/ucanto/commit/ddf56b1ec80ff6c0698255c531936d8eeab532fd))
* **ucanto:** URI protocol type retention & capability constructors ([e291544](https://www.github.com/web3-storage/ucanto/commit/e2915447254990d6e2384ff79a1da38120426ed5))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @ucanto/interface bumped from ^0.4.0 to ^0.5.0
    * @ucanto/core bumped from ^0.4.0 to ^0.5.0
    * @ucanto/validator bumped from ^0.4.0 to ^0.5.0
  * devDependencies
    * @ucanto/client bumped from ^0.3.0 to ^0.4.0
    * @ucanto/transport bumped from ^0.4.0 to ^0.5.0
    * @ucanto/authority bumped from ^0.4.0 to ^0.4.1

## [0.4.0](https://www.github.com/web3-storage/ucanto/compare/server-v0.3.0...server-v0.4.0) (2022-06-20)


### Features

* alight link API with multiformats ([#36](https://www.github.com/web3-storage/ucanto/issues/36)) ([0ec460e](https://www.github.com/web3-storage/ucanto/commit/0ec460e43ddda0bb3a3fea8a7881da1463154f36))
* cherry pick changes from uploads-v2 demo ([#43](https://www.github.com/web3-storage/ucanto/issues/43)) ([4308fd2](https://www.github.com/web3-storage/ucanto/commit/4308fd2f392b9fcccc52af64432dcb04c8257e0b))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @ucanto/interface bumped from ^0.3.0 to ^0.4.0
    * @ucanto/core bumped from ^0.3.0 to ^0.4.0
    * @ucanto/validator bumped from ^0.3.0 to ^0.4.0
  * devDependencies
    * @ucanto/client bumped from ^0.2.2 to ^0.3.0
    * @ucanto/transport bumped from ^0.3.0 to ^0.4.0
    * @ucanto/authority bumped from ^0.3.0 to ^0.4.0

## [0.3.0](https://www.github.com/web3-storage/ucanto/compare/server-v0.2.0...server-v0.3.0) (2022-06-15)


### Features

* capability provider API ([#34](https://www.github.com/web3-storage/ucanto/issues/34)) ([ea89f97](https://www.github.com/web3-storage/ucanto/commit/ea89f97125bb484a12ce3ca09a7884911a9fd4d6))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @ucanto/interface bumped from ^0.2.0 to ^0.3.0
    * @ucanto/core bumped from ^0.2.0 to ^0.3.0
    * @ucanto/validator bumped from ^0.2.0 to ^0.3.0
  * devDependencies
    * @ucanto/client bumped from ^0.2.0 to ^0.2.2
    * @ucanto/transport bumped from ^0.2.0 to ^0.3.0
    * @ucanto/authority bumped from ^0.2.0 to ^0.3.0

## [0.2.0](https://www.github.com/web3-storage/ucanto/compare/server-v0.1.0...server-v0.2.0) (2022-06-10)


### Features

* setup pnpm & release-please ([84ac7f1](https://www.github.com/web3-storage/ucanto/commit/84ac7f12e5a66ee4919fa7527858dc916850e3e0))



### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @ucanto/interface bumped from 0.0.1 to ^0.2.0
    * @ucanto/core bumped from 0.0.1 to ^0.2.0
  * devDependencies
    * @ucanto/client bumped from 0.0.1 to ^0.2.0
    * @ucanto/transport bumped from 0.0.1 to ^0.2.0
    * @ucanto/authority bumped from 0.0.1 to ^0.2.0
