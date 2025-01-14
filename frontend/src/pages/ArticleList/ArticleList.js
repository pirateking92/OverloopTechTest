import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import { ROUTE_ARTICLE_PREFIX, ROUTE_ARTICLE_CREATE } from '../../constants';
import { listArticles } from '../../services/articles';
import { listAuthors } from '../../services/authors';

function ArticleList() {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            // Fetch articles and authors concurrently for better performance
            const [articlesData, authorsData] = await Promise.all([
                listArticles(), 
                listAuthors()
            ]);

            // Map over articles and add the complete author information
            const articlesWithAuthors = articlesData.map(article => {
                // Find the matching author by ID
                const author = authorsData.find(author => author.id === article.authorId);
                
                // Create the full author name if author exists, otherwise use 'No Author'
                const authorName = author
                    ? `${author.firstName || ''} ${author.lastName || ''}`.trim() || 'No Author'
                    : 'No Author';

                return {
                    ...article,
                    author: authorName
                };
            });

            setArticles(articlesWithAuthors);
        };

        fetchData();
    }, []);

    const renderArticles = () => articles.map((article) => {
        const { id, title, author } = article;
        return (
            <tr key={id}>
                <td>
                    <Link to={`${ROUTE_ARTICLE_PREFIX}/${id}`}>{title}</Link>
                </td>
                <td>{author}</td>
            </tr>
        );
    });

    return (
        <div className="ArticleList">
            <h1>Articles</h1>
            <Link className="d-block mb-3" to={ROUTE_ARTICLE_CREATE}>
                Create a new Article
            </Link>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                    </tr>
                </thead>
                <tbody>
                    {renderArticles()}
                </tbody>
            </Table>
        </div>
    );
}

export default ArticleList;