import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import PostsScreen from '../index';

jest.mock('@tanstack/react-query', () => ({
    useInfiniteQuery: jest.fn(),
}));

const mockedInfiniteQuery = require('@tanstack/react-query').useInfiniteQuery;

describe('PostsScreen', () => {
    it('renders loading state', async () => {
        mockedInfiniteQuery.mockReturnValue({
            data: undefined,
            error: null,
            isLoading: true,
            fetchNextPage: jest.fn(),
            hasNextPage: false,
            isFetchingNextPage: false,
        });

        const { getByText } = render(<PostsScreen />);
        expect(getByText('Blog Posts')).toBeTruthy();
        expect(getByText('Loading...')).toBeTruthy();
    });

    it('renders error state', async () => {
        mockedInfiniteQuery.mockReturnValue({
            data: undefined,
            error: new Error('Network error'),
            isLoading: false,
            fetchNextPage: jest.fn(),
            hasNextPage: false,
            isFetchingNextPage: false,
        });

        const { getByText } = render(<PostsScreen />);
        expect(getByText('Blog Posts')).toBeTruthy();
        expect(getByText('Error loading posts')).toBeTruthy();
    });

    it('renders posts list', async () => {
        const fakePosts = [
            { id: 1, title: 'test post one', body: 'content one' },
            { id: 2, title: 'test post two', body: 'content two' },
        ];

        mockedInfiniteQuery.mockReturnValue({
            data: {
                pages: [fakePosts],
            },
            error: null,
            isLoading: false,
            fetchNextPage: jest.fn(),
            hasNextPage: false,
            isFetchingNextPage: false,
        });

        const { getByText } = render(<PostsScreen />);
        expect(getByText('Blog Posts')).toBeTruthy();
        // Capitalization is applied using capitalizeText so confirm the capitalized version.
        await waitFor(() => {
            expect(getByText('Test post one')).toBeTruthy();
            expect(getByText('Test post two')).toBeTruthy();
        });
    });
});
