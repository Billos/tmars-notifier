# [1.5.0](https://github.com/Billos/tmars-notifier/compare/1.4.0...1.5.0) (2025-06-26)


### Features

* **notification:** implement dynamic notification engine selection and fetch available engines ([ab6436e](https://github.com/Billos/tmars-notifier/commit/ab6436e159022f488ccedc83bca3017a95f62f7b))

# [1.4.0](https://github.com/Billos/tmars-notifier/compare/1.3.0...1.4.0) (2025-06-26)


### Bug Fixes

* **config:** set base path for frontend assets ([2c848df](https://github.com/Billos/tmars-notifier/commit/2c848dfe978c09b2acf41de8ff8a29a7df609f63))
* **notification:** conditionally set notification endpoint if provided ([6330d5f](https://github.com/Billos/tmars-notifier/commit/6330d5f7b500cb285c3c58ede4737e6547c98427))


### Features

* **notification:** add Discord notification support and update documentation ([2d22848](https://github.com/Billos/tmars-notifier/commit/2d22848e76e55907c62ccaffbdc3c458f449526f))
* **notification:** enhance notification system with links and improved logging ([017043e](https://github.com/Billos/tmars-notifier/commit/017043e91e7f1b0da995eee7b7f6f42fe33b973c))
* **notification:** refactor notification handling with Notifier type for better abstraction ([e87eb6a](https://github.com/Billos/tmars-notifier/commit/e87eb6ad8d0034e78a9c4562738e8b9ea369961e))

# [1.3.0](https://github.com/Billos/tmars-notifier/compare/1.2.0...1.3.0) (2025-06-26)


### Bug Fixes

* **changelog:** remove duplicate entries and streamline feature list for version 1.2.0 ([1feff14](https://github.com/Billos/tmars-notifier/commit/1feff145f8f056ef14cc1343152b0f2cd18c5b02))


### Features

* **gotify:** remove gotify control, this is just a notifier ([6e6507a](https://github.com/Billos/tmars-notifier/commit/6e6507a9ffc8545845802721e9bba7c4103f2037))

# [1.2.0](https://github.com/Billos/tmars-notifier/compare/1.1.0...1.2.0) (2025-06-26)

### Features

- **docker:** add Docker setup with multi-stage builds for frontend and backend ([158c258](https://github.com/Billos/tmars-notifier/commit/158c258111063beb039d43960c7b3795ac297e52))
- **env:** add environment configuration for URL and update Docker documentation ([5bb3e35](https://github.com/Billos/tmars-notifier/commit/5bb3e35a4a7e4c627fc8df6e37982099c5688bf3))
- **frontend:** basic interface in Vue ([01c9f89](https://github.com/Billos/tmars-notifier/commit/01c9f89c6329aef72c3deedf0a55e3e6488075f7))
- **participants:** add participant selection and fetch logic ([e290dc1](https://github.com/Billos/tmars-notifier/commit/e290dc175bb9bf84e5a8d2bd734eab42fa207340))
- **tmars:** remove unused Gotify user fetching logic from init function ([bda608a](https://github.com/Billos/tmars-notifier/commit/bda608ab3bc08935f9e6244e96917daa78890a56))
- **vite:** remove production URL handling and simplify API target configuration ([2115515](https://github.com/Billos/tmars-notifier/commit/2115515a147b5fb279f677714903991a35844321))

# [1.1.0](https://github.com/Billos/tmars-notifier/compare/1.0.0...1.1.0) (2025-06-25)

### Features

- **gotify:** add endpoint to set Gotify URL for users ([cb3b7fc](https://github.com/Billos/tmars-notifier/commit/cb3b7fccb50530fe5f25e838d1749fd56ecef048))
- **gotify:** add image upload functionality for user applications ([f6af18b](https://github.com/Billos/tmars-notifier/commit/f6af18bf909a1ca927c5928aa19b57313b987df8))
- **gotify:** integrate Redis for user application management and notification handling ([7777643](https://github.com/Billos/tmars-notifier/commit/7777643591d377135e732498260f4ebe0a099433))
- **gotify:** Use Gotify URL rather than token only ([2809b9e](https://github.com/Billos/tmars-notifier/commit/2809b9e627544998ef28e7956803147336c15292))
- **notifications:** refactor notification handling and add support for multiple engines ([76f446f](https://github.com/Billos/tmars-notifier/commit/76f446ff77b010ecafff75601e35f3ad6e3a5334))
- **redis:** add Redis client implementation and configuration ([dc3d8b6](https://github.com/Billos/tmars-notifier/commit/dc3d8b6d285090bbcd6e41dcf37095dba1530980))

# 1.0.0 (2025-06-25)

### Features

- **gotify:** add environment configuration for Gotify integration ([249da3d](https://github.com/Billos/tmars-notifier/commit/249da3d91f80f0a01009ccf27ba1c5fc2c9ae8fe))
- **gotify:** add openapi-typescript-codegen to get Gotify API ([06e85b5](https://github.com/Billos/tmars-notifier/commit/06e85b57caa7a933c3be41a240e6ee54164398b7))
- **gotify:** generate Gotify API ([d9709c3](https://github.com/Billos/tmars-notifier/commit/d9709c3badaaccfa356286712dd5451930fe252d))
- **gotify:** implement basic operations for Gotify API ([5a44676](https://github.com/Billos/tmars-notifier/commit/5a4467633107d878401b6066429cd554da7a04f7))
- **notifications:** basic notifications PoC ([dd2fd27](https://github.com/Billos/tmars-notifier/commit/dd2fd27ef21c786782c541cd3b8ce95656d419e9))
- **release:** semantic-release setup ([8a4164e](https://github.com/Billos/tmars-notifier/commit/8a4164e4b31b989839b012a32a5c65723743288d))
- **tmars:** tmars types ([9b5c800](https://github.com/Billos/tmars-notifier/commit/9b5c800757155c439453cd2d1e0268535e27faa7))
