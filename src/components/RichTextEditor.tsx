import React, { useState, useRef } from 'react';
import { Bold, Italic, Type, Image, List, Quote } from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  onImageUpload?: (file: File) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange, onImageUpload }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getSelectedText = () => {
    if (textareaRef.current) {
      const start = textareaRef.current.selectionStart;
      const end = textareaRef.current.selectionEnd;
      return { start, end, text: value.substring(start, end) };
    }
    return { start: 0, end: 0, text: '' };
  };

  const insertFormatting = (prefix: string, suffix: string = '') => {
    const selection = getSelectedText();
    const { start, end, text } = selection;
    
    const newValue = 
      value.substring(0, start) + 
      prefix + 
      text + 
      (suffix || prefix) + 
      value.substring(end);
    
    onChange(newValue);
    
    // Restore focus and selection
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        textareaRef.current.setSelectionRange(
          start + prefix.length,
          start + prefix.length + text.length
        );
      }
    }, 0);
  };

  const handleBold = () => insertFormatting('**');
  const handleItalic = () => insertFormatting('*');
  const handleHeading = () => insertFormatting('### ');
  const handleList = () => insertFormatting('- ');
  const handleQuote = () => insertFormatting('> ');

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        const imageMarkdown = `![${file.name}](${imageUrl})\n\n`;
        const selection = getSelectedText();
        const newValue = 
          value.substring(0, selection.start) + 
          imageMarkdown + 
          value.substring(selection.end);
        onChange(newValue);
      };
      reader.readAsDataURL(file);
      
      if (onImageUpload) {
        onImageUpload(file);
      }
    }
    // Reset file input
    event.target.value = '';
  };

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden shadow-sm">
      <div className="bg-gray-50 border-b border-gray-300 px-4 py-3 flex items-center space-x-2">
        <button
          type="button"
          onClick={handleBold}
          className="p-2 rounded hover:bg-gray-200 transition-colors tooltip"
          title="Bold (Ctrl+B)"
        >
          <Bold className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={handleItalic}
          className="p-2 rounded hover:bg-gray-200 transition-colors"
          title="Italic (Ctrl+I)"
        >
          <Italic className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={handleHeading}
          className="p-2 rounded hover:bg-gray-200 transition-colors"
          title="Heading"
        >
          <Type className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={handleList}
          className="p-2 rounded hover:bg-gray-200 transition-colors"
          title="List"
        >
          <List className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={handleQuote}
          className="p-2 rounded hover:bg-gray-200 transition-colors"
          title="Quote"
        >
          <Quote className="h-4 w-4" />
        </button>
        <div className="border-l border-gray-300 h-6 mx-2"></div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="p-2 rounded hover:bg-gray-200 transition-colors"
          title="Upload Image"
        >
          <Image className="h-4 w-4" />
        </button>
      </div>
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-96 p-4 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
        placeholder="Start writing your article... Use **bold** and *italic* formatting, or click the buttons above."
      />
    </div>
  );
};

export default RichTextEditor;