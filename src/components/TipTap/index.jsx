import './styles.css';
import { useWindowDimensions } from '../../hooks';
import { Color } from '@tiptap/extension-color';
import ListItem from '@tiptap/extension-list-item';
import TextStyle from '@tiptap/extension-text-style';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import React from 'react';
import Placeholder from '@tiptap/extension-placeholder';
import MenuBar from './MenuBar';

export default ({ value, onChange }) => {
  const { height } = useWindowDimensions();
  const editor = useEditor({
    onUpdate: () => {
      onChange(editor.getHTML(), 'description');
    },
    editorProps: {
      attributes: {
        style: `max-height: ${height / 1.9}px;`,
        class: 'editor',
      },
    },
    extensions: [
      Placeholder.configure({
        placeholder: 'Enter a description',
      }),
      Color.configure({ types: [TextStyle.name, ListItem.name] }),
      TextStyle.configure({ types: [ListItem.name] }),
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
      }),
    ],
    content: value,
  });

  return (
    <div>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};
