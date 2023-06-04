# Landin page template with Svelte Kit and TailwindCSS
Template provided by [cedrata](https://github.com/cedrata/).

This is a simple brainfuck compiler, the purpose of it is learn how to create a web-based text editor and dig deeper in Svelte.
If you like this project and find it usefuls please consider buying a coffee:
[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/E1E5E3EKB)

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

All source code is contained in ```${root}/src```
```sh
src # source directory for all the code.
├── lib # directory for all local libraries and componentes.
│   ├── compiler # local library for the BF compiler.
│   └── components # all the svelte components of the application.
└── routes # routes and pages required to run svelte application.
```

About styling please refer to [TailwindCSS](https://tailwindcss.com/) and [DaisyUI](https://daisyui.com/) docs

The `static/.nojekyll` file is required in order to make css styling effective when hosting on GitHub pages.
## Building & Deploy

To deploy your static content to github pages run:
```sh
npm run build
```

This will create a ```/docs``` directory in root to make github pages to deploy your.

To enable github pages and host the page go to repository settings and enable pages on main branch searching for the ```docs/``` directory (configured directory to build the static page).

This application is up & running online, you can try it [here](https://cedrata.github.io/brainfuck-compiler)