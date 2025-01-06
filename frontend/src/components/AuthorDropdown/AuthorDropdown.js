import React, { useState, useEffect } from 'react';
import DropdownList from 'react-widgets/lib/DropdownList';
import { listAuthors } from '../../services/authors';

function AuthorDropdown({ value, onChange }) {
    const [authors, setAuthors] = useState([]);

    useEffect(() => {
        const fetchAuthor = async () => {
            const data = await listAuthors();
            setAuthors(data);
        };
        fetchAuthor();
    }, []);

    // Find the full author object that matches the current value
    const selectedAuthor = authors.find(author => author.id === value);

    return (
        <div className="AuthorDropdown">
            <DropdownList
                value={selectedAuthor || null}
                data={[{ id: null, firstName: 'No', lastName: 'Author' }, ...authors]}
                textField={(author) => {
                    if (!author) return 'Select an author...';
                    if (author.id === null) return 'No Author';
                    return `${author.firstName} ${author.lastName}`;
                }}
                valueField="id"
                onChange={selectedAuthor => {
                    // If "No Author" is selected, pass null to parent
                    onChange(selectedAuthor?.id || null);
                }}
                placeholder="Select an author..."
            />
        </div>
    );
}

export default AuthorDropdown;