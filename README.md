# NodeSim

A network simulation application that allows users to create and visualize a network of students and their connections. Built with React, D3.js, and Material-UI.

## Features

- Create and manage a network of students
- Add connections between students
- Interactive network graph visualization
- Find shortest paths between students
- Drag and drop nodes to rearrange the network
- Modern, responsive UI

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/node-sim-app.git
cd node-sim-app
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Usage

1. Add students using the "Add New Student" form
2. Create connections between students using the "Add New Connection" form
3. Use the interactive graph to visualize the network
4. Find paths between students using the "Find Path" feature
5. Drag nodes to rearrange the network layout
6. Remove students or connections using the delete buttons in the lists

## Project Structure

```
node-sim-app/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── NetworkGraph.jsx    # D3.js network visualization
│   │   ├── StudentForm.jsx     # Form for adding students
│   │   ├── ConnectionForm.jsx  # Form for adding connections
│   │   ├── PathFinder.jsx      # Path finding interface
│   │   ├── StudentList.jsx     # List of students
│   │   └── ConnectionList.jsx  # List of connections
│   ├── hooks/
│   │   ├── useNetworkGraph.js  # Network state management
│   │   └── useDraggable.js     # Drag and drop functionality
│   ├── utils/
│   │   └── pathFinding.js      # Path finding algorithm
│   ├── App.jsx                 # Main application component
│   ├── index.jsx              # Application entry point
│   └── styles.css             # Global styles
├── package.json
└── README.md
```

## Technologies Used

- React 18
- D3.js for network visualization
- Material-UI for components and styling
- Vite for build tooling

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
