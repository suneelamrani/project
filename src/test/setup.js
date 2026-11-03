import '@testing-library/jest-dom';

// Mock scrollTo since jsdom doesn't implement it
window.scrollTo = () => {};

// Mock window.print
window.print = () => {};

