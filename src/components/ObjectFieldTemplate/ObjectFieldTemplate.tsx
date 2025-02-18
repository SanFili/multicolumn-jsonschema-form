import React, { useState, useEffect, useMemo } from 'react';
import { Typography, Col } from 'antd';
import './ObjectFieldTemplate.css';

type Test = {
  content: any;
  name: string;
};
function ObjectFieldTemplate(props: any) {
  console.log(props);
  const [properties, setProperties] = useState<Record<string, Test>>({});
  const layout = props.formContext.getLayout();

  useEffect(() => {
    const obj = (props.properties || []).reduce(
      (acc: any, curr: any) => ({
        ...acc,
        [curr.name]: { content: curr.content, name: curr.name },
      }),
      {}
    );
    setProperties(obj);
  }, [props.properties]);

  const gridLayout = useMemo(
    () =>
      layout.sections.map((section: any) => {
        return (
          <div key={`section-${section.id}`}>
            {section.header && (
              <Typography.Title
                level={section.header.heading_size || 4}
                style={{
                  textAlign: section.header.align || 'center',
                }}
              >
                {section.header.title}
              </Typography.Title>
            )}
            <div
              className={
                section.settings.layout
                  ? `layout__section_${section.settings.layout}`
                  : undefined
              }
            >
              {section.blocks.map((block: any) => {
                return (
                  <div
                    key={`${section.id}-${block.id}`}
                    className="layout__block"
                    style={{
                      width: `${100 / (24 / block.width)}%`,
                    }}
                  >
                    {Object.keys(block.fields).map((el: any) => {
                      const field = properties[el];
                      delete properties[el];
                      return field ? (
                        <Col
                          key={field.name}
                          data-field={field.name}
                          span={block.fields[el].width || 24 / block.columns}
                          style={{ padding: '0 8px' }}
                        >
                          {field.content}
                        </Col>
                      ) : null;
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        );
      }),
    [properties, layout]
  );
  return (
    <div>
      <Typography.Title level={3}>{props.title}</Typography.Title>
      {gridLayout}
      {props.properties.map((el: any) =>
        properties[el.name] ? (
          <div key={el.name} style={{ padding: '0 8px' }}>
            {el.content}
          </div>
        ) : null
      )}
    </div>
  );
}
export default ObjectFieldTemplate;
