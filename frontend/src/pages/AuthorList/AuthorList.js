import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';

import { ROUTE_AUTHOR_PREFIX, ROUTE_AUTHOR_CREATE } from '../../constants';
import { listAuthors } from '../../services/authors';

function AuthorList() {
    const [author, setAuthor] = useState([]);

    useEffect(() => {
        const fetchAuthor = async () => {
            const data = await listAuthors();
            setAuthor(data);
        };

        fetchAuthor();
    }, []);

    const renderAuthor = () => author.map((author) => {
        const { id, firstName, lastName } = author;

        return (
            <tr key={ id }>
                <td>
                    <Link to={ `${ROUTE_AUTHOR_PREFIX}/${id}` }>{ ` ${firstName} ${lastName} ` }</Link>
                </td>
            </tr>
        );
    });

    return (
        <div className="AuthorList">
            <h1>Author</h1>
            <Link className="d-block mb-3" to={ ROUTE_AUTHOR_CREATE }>
                Create a new Author
            </Link>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Author Name</th>
                    </tr>
                </thead>
                <tbody>
                    { renderAuthor() }
                </tbody>
            </Table>
        </div>
    );
}

export default AuthorList;
