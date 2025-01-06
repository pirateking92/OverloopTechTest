/* eslint-disable no-undef */
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import ArticleCreate from '../pages/ArticleCreate/ArticleCreate';
import { createArticle } from '../services/articles';

jest.mock('../services/articles');
jest.mock('../components/RegionDropdown/RegionDropdown', () => {
    return function MockRegionDropdown({ onChange }) {
        return <select data-testid="region-dropdown" onChange={(e) => onChange([{ id: 1 }])} />;
    };
});
jest.mock('../components/AuthorDropdown/AuthorDropdown', () => {
    return function MockAuthorDropdown({ onChange }) {
        return <select data-testid="author-dropdown" onChange={(e) => onChange(1)} />;
    };
});

describe('ArticleCreate', () => {
    let history;

    beforeEach(() => {
        history = createMemoryHistory();
        createArticle.mockResolvedValue({});
    });

    it('renders form elements correctly', () => {
        render(
            <Router history={history}>
                <ArticleCreate />
            </Router>
        );

        expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/content/i)).toBeInTheDocument();
        expect(screen.getByTestId('region-dropdown')).toBeInTheDocument();
        expect(screen.getByTestId('author-dropdown')).toBeInTheDocument();
    });

    it('submits form with correct data', async () => {
        render(
            <Router history={history}>
                <ArticleCreate />
            </Router>
        );

        fireEvent.change(screen.getByLabelText(/title/i), {
            target: { value: 'Test Title' },
        });
        fireEvent.change(screen.getByLabelText(/content/i), {
            target: { value: 'Test Content' },
        });
        fireEvent.change(screen.getByTestId('region-dropdown'));
        fireEvent.change(screen.getByTestId('author-dropdown'));

        fireEvent.click(screen.getByText(/save article/i));

        // Allow the mock promise to resolve
        // await new Promise(process.nextTick);

        // Check that createArticle was called with correct data
        expect(createArticle).toHaveBeenCalledWith({
            title: 'Test Title',
            content: 'Test Content',
            regions: [{ id: 1 }],
            authorId: 1,
        });
    });
});