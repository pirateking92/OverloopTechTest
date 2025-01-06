import React, { useState, useEffect } from 'react';
import Multiselect from 'react-widgets/lib/Multiselect'

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

    return (
        <div className="AuthorDropdown">
            <Multiselect
                value={ value }
                data={ authors }
                textField={(author) => `${author.firstName} ${author.lastName}`}
                valueField="id"
                onChange={ onChange }
                allowCreate={ false }
            />
        </div>
    );
}

export default AuthorDropdown;
