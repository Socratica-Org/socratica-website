
// this file is generated — do not edit it


/// <reference types="@sveltejs/kit" />

/**
 * Environment variables [loaded by Vite](https://vitejs.dev/guide/env-and-mode.html#env-files) from `.env` files and `process.env`. Like [`$env/dynamic/private`](https://kit.svelte.dev/docs/modules#$env-dynamic-private), this module cannot be imported into client-side code. This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://kit.svelte.dev/docs/configuration#env) (if configured).
 * 
 * _Unlike_ [`$env/dynamic/private`](https://kit.svelte.dev/docs/modules#$env-dynamic-private), the values exported from this module are statically injected into your bundle at build time, enabling optimisations like dead code elimination.
 * 
 * ```ts
 * import { API_KEY } from '$env/static/private';
 * ```
 * 
 * Note that all environment variables referenced in your code should be declared (for example in an `.env` file), even if they don't have a value until the app is deployed:
 * 
 * ```
 * MY_FEATURE_FLAG=""
 * ```
 * 
 * You can override `.env` values from the command line like so:
 * 
 * ```bash
 * MY_FEATURE_FLAG="enabled" npm run dev
 * ```
 */
declare module '$env/static/private' {
	export const npm_command: string;
	export const npm_config_userconfig: string;
	export const COLORTERM: string;
	export const npm_config_cache: string;
	export const NIX_BUILD_CORES: string;
	export const REPL_OWNER: string;
	export const configureFlags: string;
	export const NIXPKGS_ALLOW_UNFREE: string;
	export const mesonFlags: string;
	export const HOSTNAME: string;
	export const __EGL_VENDOR_LIBRARY_FILENAMES: string;
	export const shell: string;
	export const depsHostHost: string;
	export const NODE: string;
	export const NODE_EXTRA_CA_CERTS: string;
	export const XDG_DATA_HOME: string;
	export const REPL_OWNER_ID: string;
	export const STRINGS: string;
	export const XDG_CONFIG_HOME: string;
	export const depsTargetTarget: string;
	export const stdenv: string;
	export const COLOR: string;
	export const npm_config_local_prefix: string;
	export const builder: string;
	export const DENO_TLS_CA_STORE: string;
	export const REPLIT_CLI: string;
	export const shellHook: string;
	export const npm_config_globalconfig: string;
	export const EDITOR: string;
	export const phases: string;
	export const REPLIT_SUBCLUSTER: string;
	export const PWD: string;
	export const NIX_PROFILES: string;
	export const SOURCE_DATE_EPOCH: string;
	export const NIX_ENFORCE_NO_NATIVE: string;
	export const REPLIT_DB_URL: string;
	export const NIX_PATH: string;
	export const npm_config_init_module: string;
	export const CXX: string;
	export const _: string;
	export const REPL_ID: string;
	export const system: string;
	export const HOST_PATH: string;
	export const doInstallCheck: string;
	export const HOME: string;
	export const NIX_BINTOOLS: string;
	export const LANG: string;
	export const REPL_IDENTITY: string;
	export const depsTargetTargetPropagated: string;
	export const npm_package_version: string;
	export const cmakeFlags: string;
	export const outputs: string;
	export const NIX_STORE: string;
	export const GIT_ASKPASS: string;
	export const REPL_IMAGE: string;
	export const LD: string;
	export const buildPhase: string;
	export const INIT_CWD: string;
	export const READELF: string;
	export const XDG_CACHE_HOME: string;
	export const npm_lifecycle_script: string;
	export const doCheck: string;
	export const depsBuildBuild: string;
	export const TERM: string;
	export const npm_package_name: string;
	export const REPLIT_CLUSTER: string;
	export const SIZE: string;
	export const propagatedNativeBuildInputs: string;
	export const npm_config_prefix: string;
	export const REPL_LANGUAGE: string;
	export const USER: string;
	export const strictDeps: string;
	export const REPL_HOME: string;
	export const REPLIT_PID1_VERSION: string;
	export const AR: string;
	export const AS: string;
	export const DISPLAY: string;
	export const NIX_BINTOOLS_WRAPPER_TARGET_HOST_x86_64_unknown_linux_gnu: string;
	export const npm_lifecycle_event: string;
	export const SHLVL: string;
	export const NIX_BUILD_TOP: string;
	export const NM: string;
	export const GIT_EDITOR: string;
	export const NIX_CFLAGS_COMPILE: string;
	export const patches: string;
	export const LIBGL_DRIVERS_PATH: string;
	export const buildInputs: string;
	export const LOCALE_ARCHIVE: string;
	export const npm_config_user_agent: string;
	export const npm_execpath: string;
	export const LD_LIBRARY_PATH: string;
	export const SSL_CERT_FILE: string;
	export const REPLIT_ENVIRONMENT: string;
	export const NODE_PATH: string;
	export const depsBuildTarget: string;
	export const OBJCOPY: string;
	export const REQUESTS_CA_BUNDLE: string;
	export const out: string;
	export const npm_package_json: string;
	export const STRIP: string;
	export const XDG_DATA_DIRS: string;
	export const REPL_IDENTITY_KEY: string;
	export const OBJDUMP: string;
	export const npm_config_noproxy: string;
	export const PATH: string;
	export const propagatedBuildInputs: string;
	export const npm_config_metrics_registry: string;
	export const npm_config_node_gyp: string;
	export const DOCKER_CONFIG: string;
	export const CC: string;
	export const NIX_CC: string;
	export const __ETC_PROFILE_SOURCED: string;
	export const depsBuildTargetPropagated: string;
	export const depsBuildBuildPropagated: string;
	export const npm_config_global_prefix: string;
	export const NIX_CC_WRAPPER_TARGET_HOST_x86_64_unknown_linux_gnu: string;
	export const NIX_INDENT_MAKE: string;
	export const REPL_PUBKEYS: string;
	export const CONFIG_SHELL: string;
	export const npm_node_execpath: string;
	export const RANLIB: string;
	export const NIX_HARDENING_ENABLE: string;
	export const REPL_SLUG: string;
	export const NIX_LDFLAGS: string;
	export const nativeBuildInputs: string;
	export const name: string;
	export const depsHostHostPropagated: string;
	export const NODE_ENV: string;
}

/**
 * Similar to [`$env/static/private`](https://kit.svelte.dev/docs/modules#$env-static-private), except that it only includes environment variables that begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env) (which defaults to `PUBLIC_`), and can therefore safely be exposed to client-side code.
 * 
 * Values are replaced statically at build time.
 * 
 * ```ts
 * import { PUBLIC_BASE_URL } from '$env/static/public';
 * ```
 */
declare module '$env/static/public' {
	
}

/**
 * This module provides access to runtime environment variables, as defined by the platform you're running on. For example if you're using [`adapter-node`](https://github.com/sveltejs/kit/tree/master/packages/adapter-node) (or running [`vite preview`](https://kit.svelte.dev/docs/cli)), this is equivalent to `process.env`. This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://kit.svelte.dev/docs/configuration#env) (if configured).
 * 
 * This module cannot be imported into client-side code.
 * 
 * ```ts
 * import { env } from '$env/dynamic/private';
 * console.log(env.DEPLOYMENT_SPECIFIC_VARIABLE);
 * ```
 * 
 * > In `dev`, `$env/dynamic` always includes environment variables from `.env`. In `prod`, this behavior will depend on your adapter.
 */
declare module '$env/dynamic/private' {
	export const env: {
		npm_command: string;
		npm_config_userconfig: string;
		COLORTERM: string;
		npm_config_cache: string;
		NIX_BUILD_CORES: string;
		REPL_OWNER: string;
		configureFlags: string;
		NIXPKGS_ALLOW_UNFREE: string;
		mesonFlags: string;
		HOSTNAME: string;
		__EGL_VENDOR_LIBRARY_FILENAMES: string;
		shell: string;
		depsHostHost: string;
		NODE: string;
		NODE_EXTRA_CA_CERTS: string;
		XDG_DATA_HOME: string;
		REPL_OWNER_ID: string;
		STRINGS: string;
		XDG_CONFIG_HOME: string;
		depsTargetTarget: string;
		stdenv: string;
		COLOR: string;
		npm_config_local_prefix: string;
		builder: string;
		DENO_TLS_CA_STORE: string;
		REPLIT_CLI: string;
		shellHook: string;
		npm_config_globalconfig: string;
		EDITOR: string;
		phases: string;
		REPLIT_SUBCLUSTER: string;
		PWD: string;
		NIX_PROFILES: string;
		SOURCE_DATE_EPOCH: string;
		NIX_ENFORCE_NO_NATIVE: string;
		REPLIT_DB_URL: string;
		NIX_PATH: string;
		npm_config_init_module: string;
		CXX: string;
		_: string;
		REPL_ID: string;
		system: string;
		HOST_PATH: string;
		doInstallCheck: string;
		HOME: string;
		NIX_BINTOOLS: string;
		LANG: string;
		REPL_IDENTITY: string;
		depsTargetTargetPropagated: string;
		npm_package_version: string;
		cmakeFlags: string;
		outputs: string;
		NIX_STORE: string;
		GIT_ASKPASS: string;
		REPL_IMAGE: string;
		LD: string;
		buildPhase: string;
		INIT_CWD: string;
		READELF: string;
		XDG_CACHE_HOME: string;
		npm_lifecycle_script: string;
		doCheck: string;
		depsBuildBuild: string;
		TERM: string;
		npm_package_name: string;
		REPLIT_CLUSTER: string;
		SIZE: string;
		propagatedNativeBuildInputs: string;
		npm_config_prefix: string;
		REPL_LANGUAGE: string;
		USER: string;
		strictDeps: string;
		REPL_HOME: string;
		REPLIT_PID1_VERSION: string;
		AR: string;
		AS: string;
		DISPLAY: string;
		NIX_BINTOOLS_WRAPPER_TARGET_HOST_x86_64_unknown_linux_gnu: string;
		npm_lifecycle_event: string;
		SHLVL: string;
		NIX_BUILD_TOP: string;
		NM: string;
		GIT_EDITOR: string;
		NIX_CFLAGS_COMPILE: string;
		patches: string;
		LIBGL_DRIVERS_PATH: string;
		buildInputs: string;
		LOCALE_ARCHIVE: string;
		npm_config_user_agent: string;
		npm_execpath: string;
		LD_LIBRARY_PATH: string;
		SSL_CERT_FILE: string;
		REPLIT_ENVIRONMENT: string;
		NODE_PATH: string;
		depsBuildTarget: string;
		OBJCOPY: string;
		REQUESTS_CA_BUNDLE: string;
		out: string;
		npm_package_json: string;
		STRIP: string;
		XDG_DATA_DIRS: string;
		REPL_IDENTITY_KEY: string;
		OBJDUMP: string;
		npm_config_noproxy: string;
		PATH: string;
		propagatedBuildInputs: string;
		npm_config_metrics_registry: string;
		npm_config_node_gyp: string;
		DOCKER_CONFIG: string;
		CC: string;
		NIX_CC: string;
		__ETC_PROFILE_SOURCED: string;
		depsBuildTargetPropagated: string;
		depsBuildBuildPropagated: string;
		npm_config_global_prefix: string;
		NIX_CC_WRAPPER_TARGET_HOST_x86_64_unknown_linux_gnu: string;
		NIX_INDENT_MAKE: string;
		REPL_PUBKEYS: string;
		CONFIG_SHELL: string;
		npm_node_execpath: string;
		RANLIB: string;
		NIX_HARDENING_ENABLE: string;
		REPL_SLUG: string;
		NIX_LDFLAGS: string;
		nativeBuildInputs: string;
		name: string;
		depsHostHostPropagated: string;
		NODE_ENV: string;
		[key: `PUBLIC_${string}`]: undefined;
		[key: `${string}`]: string | undefined;
	}
}

/**
 * Similar to [`$env/dynamic/private`](https://kit.svelte.dev/docs/modules#$env-dynamic-private), but only includes variables that begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env) (which defaults to `PUBLIC_`), and can therefore safely be exposed to client-side code.
 * 
 * Note that public dynamic environment variables must all be sent from the server to the client, causing larger network requests — when possible, use `$env/static/public` instead.
 * 
 * ```ts
 * import { env } from '$env/dynamic/public';
 * console.log(env.PUBLIC_DEPLOYMENT_SPECIFIC_VARIABLE);
 * ```
 */
declare module '$env/dynamic/public' {
	export const env: {
		[key: `PUBLIC_${string}`]: string | undefined;
	}
}
