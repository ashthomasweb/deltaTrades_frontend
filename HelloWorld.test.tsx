import { render, screen } from '@testing-library/react';
import {HelloWorld} from "./HelloWorld.tsx";

test('Renders Hello World', () => {
    render(<HelloWorld />);
    const headerElement = screen.getByText(/Hello World/i);
    expect(headerElement).toBeInTheDocument();
});
