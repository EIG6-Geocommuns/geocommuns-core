<p align="center">
    <img src="https://user-images.githubusercontent.com/6702424/80216211-00ef5280-863e-11ea-81de-59f3a3d4b8e4.png">  
</p>
<p align="center">
    <i>Set of shared utilities (hooks and Components) for the geocomuns project</i>
    <br>
    <br>
    <a href="https://github.com/EIG6-Geocommuns/geocommuns-core/actions">
      <img src="https://github.com/EIG6-Geocommuns/geocommuns-core/workflows/ci/badge.svg?branch=main">
    </a>
    <a href="https://bundlephobia.com/package/geocommuns-core">
      <img src="https://img.shields.io/bundlephobia/minzip/geocommuns-core">
    </a>
    <a href="https://www.npmjs.com/package/geocommuns-core">
      <img src="https://img.shields.io/npm/dw/geocommuns-core">
    </a>
    <a href="https://github.com/EIG6-Geocommuns/geocommuns-core/blob/main/LICENSE">
      <img src="https://img.shields.io/npm/l/geocommuns-core">
    </a>
</p>
<p align="center">
  <a href="https://github.com/EIG6-Geocommuns/geocommuns-core">Home</a>
  -
  <a href="https://github.com/EIG6-Geocommuns/geocommuns-core">Documentation</a>
</p>

# Install / Import

```bash
$ yarn add geocommuns-core
```

# Link this module in main project

```bash
cd ~/github
git clone https://github.com/EIG6-Geocommuns/lidarviz-front
cd lidarviz-front
yarn

cd ~/github
git clone https://github.com/EIG6-Geocommuns/another-app
cd another-app
yarn

cd ~/github
git clone https://github.com/EIG6-Geocommuns/geocommuns-core
cd geocommuns-core
yarn
yarn build
yarn link-in-main-project lidarviz-front another-app
npx tsc -w

# Open another terminal

cd ~/github/lidarviz-front
rm -rf node_modules/.cache
yarn start
```
