# Landin page template with Svelte Kit and TailwindCSS
Template provided by [cedrata](https://github.com/cedrata/).

This is a simple demo project to help you getting started in the creation of a simple (static content) landing page made with Svelte using TailwindCSS and DaisyUI (nice little TailwindCSS wrapper) to style it out.
You can create your own repository starting from this template already configured to use TailwindCSS and DaisyUI.

If your needs are different and you require different configurations refeer to Svelte npm package, Tailwind installation documentation and DaisyUI.

The page in this template will be hosted inside github pages.
## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

All source code is contained in ```${root}/src```
```
+-assets // images and static data
|
+-components // local project components
| |
| +layout // layout components
|
+-routes // check svelte documentation
```
I personally like to have a ```data``` and ```stores``` directories in ```${root}/src/lib/``` to keep any static data and a Svelte stores.

About styling please refer to [TailwindCSS](https://tailwindcss.com/) and [DaisyUI](https://daisyui.com/) docs

## Building & Deploy

To deploy your static content to github pages run:
```sh
npm run build
```

This will create a ```/docs``` directory in root to make github pages to deploy your.

To enable github pages and host the page go to repository settings and enable pages on main branch searching for the ```docs/``` directory (configured directory to build the static page).