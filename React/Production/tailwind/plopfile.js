export default function (plop) {
    plop.setGenerator('feature', {
        description: 'Scaffold a new enterprise feature module',
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: 'Feature name (e.g. billing, projects):',
            },
        ],
        actions: [
            {
                type: 'add',
                path: 'src/features/{{camelCase name}}/pages/{{pascalCase name}}Page.tsx',
                templateFile: 'plop-templates/Page.tsx.hbs',
            },
            {
                type: 'add',
                path: 'src/features/{{camelCase name}}/components/{{pascalCase name}}Card.tsx',
                templateFile: 'plop-templates/Component.tsx.hbs',
            },
            {
                type: 'add',
                path: 'src/features/{{camelCase name}}/services/{{camelCase name}}Service.ts',
                templateFile: 'plop-templates/Service.ts.hbs',
            },
            {
                type: 'add',
                path: 'src/features/{{camelCase name}}/{{camelCase name}}Slice.ts',
                templateFile: 'plop-templates/Slice.ts.hbs',
            },
            {
                type: 'add',
                path: 'src/features/{{camelCase name}}/index.ts',
                template: `export { default as {{pascalCase name}}Page } from './pages/{{pascalCase name}}Page';
export * from './components/{{pascalCase name}}Card';
export {
  default as {{camelCase name}}Reducer,
  setItems,
  setLoading,
  setError
} from './{{camelCase name}}Slice';
export * from './services/{{camelCase name}}Service';
`,
            },
        ],
    });
}
