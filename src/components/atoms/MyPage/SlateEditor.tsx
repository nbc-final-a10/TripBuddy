import React, { useCallback, useMemo } from 'react';
import { createEditor, Descendant } from 'slate';
import {
    Slate,
    Editable,
    withReact,
    RenderElementProps,
    RenderLeafProps,
} from 'slate-react';

interface SlateEditorProps {
    value: Descendant[];
    onChange: (value: Descendant[]) => void;
}

const SlateEditor: React.FC<SlateEditorProps> = ({ value, onChange }) => {
    const editor = useMemo(() => withReact(createEditor()), []);

    const renderElement = useCallback((props: RenderElementProps) => {
        return <DefaultElement {...props} />;
    }, []);

    const renderLeaf = useCallback((props: RenderLeafProps) => {
        return <DefaultLeaf {...props} />;
    }, []);

    return (
        <Slate editor={editor} initialValue={value} onChange={onChange}>
            <Editable
                renderElement={renderElement}
                renderLeaf={renderLeaf}
                placeholder="내용을 입력하세요"
                className="w-full px-3 py-2 border border-gray-300 rounded h-32"
            />
        </Slate>
    );
};

const DefaultElement: React.FC<RenderElementProps> = props => {
    return <p {...props.attributes}>{props.children}</p>;
};

const DefaultLeaf: React.FC<RenderLeafProps> = props => {
    return <span {...props.attributes}>{props.children}</span>;
};

export default SlateEditor;
