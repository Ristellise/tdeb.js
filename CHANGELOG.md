# Changelog

## [1.0.1] - 2026-03-08

### Changed

- Implemented a dual-file distribution architecture to optimize for both modern and legacy environments.
- `tdeb.mjs` (ES Modules) now utilizes modern ES6+ syntax (`const`, arrow functions, `flatMap`, `Object.entries`). This targets environments that natively support modules.
- `tdeb.js` (CommonJS / Global Script) has been rewritten in pure ES5. It uses `var`, standard function declarations, and manual DOM iteration to ensure maximum backward compatibility for legacy browsers and older environments.

## [1.0.0] - 2026-03-08

### Added
- Initial Release.