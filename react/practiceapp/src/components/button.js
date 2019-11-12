import React from 'react';

function Button({ title, href }) {
    return (
        <a class="btn btn-default" href={href} title={title}>{title}</a>
    );
}

export default Button;