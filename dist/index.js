/* tslint:disable */
/* eslint-disable */
/* prettier-ignore */

const fs = require('fs')
const path = require('path')

const {platform, arch} = process

const modulePath = () => {
    switch (platform) {
        case 'darwin': {
            switch (arch) {
                case 'x64': {
                    const modulePath = path.resolve(module.path, './japanese-address-parser.darwin-x64.node')
                    if (!fs.existsSync(modulePath)) {
                        throw new Error(`Fail to find native module in: ${modulePath}`);
                    }
                    return modulePath
                }
                case 'arm64': {
                    const modulePath = path.resolve(module.path, './japanese-address-parser.darwin-arm64.node')
                    if (!fs.existsSync(modulePath)) {
                        throw new Error(`Fail to find native module in: ${modulePath}`);
                    }
                    return modulePath
                }
                default: {
                    throw new Error(`Unsupported architecture on macOS: ${arch}`);
                }
            }
        }
        case 'android': {
            switch (arch) {
                case 'arm64': {
                    const modulePath = path.resolve(module.path, './japanese-address-parser.android-arm64.node')
                    if (!fs.existsSync(modulePath)) {
                        throw new Error(`Fail to find native module in: ${modulePath}`);
                    }
                    return modulePath
                }
                case 'arm': {
                    const modulePath = path.resolve(module.path, './japanese-address-parser.android-arm-eabi.node')
                    if (!fs.existsSync(modulePath)) {
                        throw new Error(`Fail to find native module in: ${modulePath}`);
                    }
                    return modulePath
                }
                default: {
                    throw new Error(`Unsupported architecture on Android ${arch}`)
                }
            }
        }
        case 'linux': {
            switch (arch) {
                case 'x64': {
                    const modulePath = path.resolve(module.path, './japanese-address-parser.linux-x64-gnu.node')
                    if (!fs.existsSync(modulePath)) {
                        throw new Error(`Fail to find native module in: ${modulePath}`);
                    }
                    return modulePath
                }
                default: {
                    throw new Error(`Unsupported architecture on Linux: ${arch}`)
                }
            }
        }
        default: {
            throw new Error(`Unsupported OS: ${platform}, architecture: ${arch}`)
        }
    }
}

const nativeBinding = (modulePath) => {
    try {
        return require(modulePath)
    } catch (_) {
        throw new Error(`Failed to load native binding`)
    }
}

const {Parser, ParsedAddress, Metadata, ParserOptions} = nativeBinding(modulePath())

module.exports.Parser = Parser
module.exports.ParsedAddress = ParsedAddress
module.exports.Metadata = Metadata
module.exports.ParserOptions = ParserOptions
