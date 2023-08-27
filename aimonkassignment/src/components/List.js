import React, { useState } from 'react';

const TagView = ({ tag, onAddChild, onUpdateTag, onDelete }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(tag.name);
  const [data, setData] = useState(tag.data);

  const handleToggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDataChange = (event) => {
    setData(event.target.value);
  };

  const handleSave = () => {
    onUpdateTag(tag, { name, data });
    setEditing(false);
  };

  return (
    <div className="tag">
      <div className="tag-header">
        <button onClick={handleToggleCollapse}>{collapsed ? '>' : 'v'}</button>
        {editing ? (
          <input type="text" value={name} onChange={handleNameChange} onBlur={handleSave} autoFocus />
        ) : (
          <span className="tag-name" onClick={handleEdit}>
            {tag.name}
          </span>
        )}
        <button onClick={() => onAddChild(tag)}>Add Child</button>
        <button onClick={() => onDelete(tag)}>Delete</button>
      </div>
      {!collapsed && (
        <div className="tag-content">
          {tag.data !== undefined && (
            <input type="text" value={data} onChange={handleDataChange} onBlur={handleSave} />
          )}
          {tag.children &&
            tag.children.map((child) => (
              <TagView key={child.name} tag={child} onAddChild={onAddChild} onUpdateTag={onUpdateTag} onDelete={onDelete} />
            ))}
        </div>
      )}
    </div>
  );
};

export default TagView;
