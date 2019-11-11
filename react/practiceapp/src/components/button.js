import React from 'react';

export default function Button({title}) {
    return (
        <button class="btn btn-default" title="{title}">{title}</button>
    );
}