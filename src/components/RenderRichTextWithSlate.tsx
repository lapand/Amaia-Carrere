import React, { useMemo, useState } from 'react';
import { Slate, Editable, withReact } from 'slate-react';
import { createEditor } from 'slate';
import { withHistory } from 'slate-history';
import { Descendant } from 'slate';

interface RenderRichTextWithSlateProps {
  initialValue: Descendant[];
}

const RenderRichTextWithSlate: React.FC<RenderRichTextWithSlateProps> = ({
  initialValue,
}) => {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const [value, setValue] = useState(initialValue);

  const renderElement = ({ attributes, children, element }: any) => {
    switch (element.type) {
      case 'heading':
        const Tag = `h${element.level || 1}`;
        return <Tag {...attributes}>{children}</Tag>;
      case 'paragraph':
        return <p {...attributes}>{children}</p>;
      case 'list':
        const ListTag = element.ordered ? 'ol' : 'ul';
        return <ListTag {...attributes}>{children}</ListTag>;
      case 'list-item':
        return <li {...attributes}>{children}</li>;
      case 'quote':
        return <blockquote {...attributes}>{children}</blockquote>;
      case 'code':
        return (
          <pre {...attributes}>
            <code>{children}</code>
          </pre>
        );
      default:
        return <div {...attributes}>{children}</div>;
    }
  };

  const renderLeaf = ({ attributes, children, leaf }: any) => {
    if (leaf.bold) {
      children = <strong>{children}</strong>;
    }
    if (leaf.italic) {
      children = <em>{children}</em>;
    }
    if (leaf.underline) {
      children = <u>{children}</u>;
    }
    return <span {...attributes}>{children}</span>;
  };

  return (
    <Slate
      editor={editor}
      value={value}
      onChange={(newValue) => setValue(newValue)}
    >
      <Editable renderElement={renderElement} renderLeaf={renderLeaf} />
    </Slate>
  );
};

export default RenderRichTextWithSlate;
