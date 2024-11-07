# AgriVision

<div style="text-align: justify;">  AgriVision offers an all-in-one solution for plantation owners and managers, combining advanced drone imaging, IoT data, and AI-driven insights. Optimize your resources, increase productivity, and boost profitability with real-time field analytics tailored for precision agriculture. Empower your business with AgriVision's cutting-edge technology to stay ahead in the competitive agricultural industry. </div>

Our Team:

Mr.Vishan Jayasinghearachchi (Supervisor)\
Dr.Kapila Dissanayaka (Co-Supervisor)

Members:\
[Dinuka Kariyawasam](https://www.linkedin.com/in/dinuka-kariyawasam-46248725b/) \
[Prathila Kahandagamge](https://www.linkedin.com/in/prathila-kahandagamage-70a495b3/)\
[Joel Milendra](https://www.linkedin.com/in/joel-milendra-055761247/)\
[Rivindu Fernando](https://www.linkedin.com/in/rivindu-fernando-516825246/)

Web Link: https://agri-vision.github.io/AgriVision















# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
