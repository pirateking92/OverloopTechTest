import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';

import { ROUTE_AUTHOR_PREFIX, ROUTE_AUTHOR_CREATE } from '../../constants';
import { listAuthors } from '../../services/Authors';

function AuthorList() {
    const [Authors, setAuthors] = useState([]);

    useEffect(() => {
        const fetchAuthors = async () => {
            const data = await listAuthors();
            setAuthors(data);
        };

        fetchAuthors();
    }, []);

    const renderAuthors = () => Authors.map((Author) => {
        const { id, title } = Author;

        return (
            <tr key={ id }>
                <td>
                    <Link to={ `${ROUTE_AUTHOR_PREFIX}/${id}` }>{ title }</Link>
                </td>
            </tr>
        );
    });

    return (
        <div className="AuthorList">
            <h1>Authors</h1>
            <Link className="d-block mb-3" to={ ROUTE_AUTHOR_CREATE }>
                Create a new Author
            </Link>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Title</th>
                    </tr>
                </thead>
                <tbody>
                    { renderAuthors() }
                </tbody>
            </Table>
        </div>
    );
}

export default AuthorList;
