
const mockFileSystem = [
  {
    type: 'folder',
    name: 'src',
    children: [
      { type: 'file', name: 'index.js' },
      { type: 'file', name: 'App.js' },
      {
        type: 'folder',
        name: 'components',
        children: [
          { type: 'file', name: 'Navbar.js' },
          { type: 'file', name: 'Sidebar.js' },
          { type: 'file', name: 'CodeEditor.js' }
        ]
      }
    ]
  },
  { type: 'file', name: 'package.json' },
  { type: 'file', name: 'README.md' }
];

export default mockFileSystem;
