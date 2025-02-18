import React from 'react';
import Form from '@rjsf/antd';
import validator from '@rjsf/validator-ajv8';
import RJSFSchema from './data/jsonSchema.json';
import RJSFUiSchema from './data/uiSchema.json';
import layout from './data/layout.json';
import './App.css';
import ObjectFieldTemplate from './components/ObjectFieldTemplate/ObjectFieldTemplate';

const schema = JSON.parse(JSON.stringify(RJSFSchema));
const uiSchema = JSON.parse(JSON.stringify(RJSFUiSchema));

function App() {
  return (
    <div className="App">
      <Form
        schema={schema}
        uiSchema={uiSchema}
        validator={validator}
        formContext={{ getLayout: () => layout }}
        templates={{ ObjectFieldTemplate }}
      />
    </div>
  );
}

export default App;
