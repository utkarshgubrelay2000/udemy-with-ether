import React, { useEffect, useState } from 'react'

export default props => {
    const [mouseEntered, setMouseEntered] = useState(false);

    const handleCardClick = () => {
      props.setSelectedJob(props.job);
    }

    return (
      <div
        class="card h-200"
        onClick={() => handleCardClick()}
        onMouseEnter={() => setMouseEntered(true)}
        onMouseLeave={() => setMouseEntered(false)}
        className="mt-2"
        style={{
          transition: 'border 0.2s',
          maxHeight: 150,
          border: '3px solid transparant',
          ...(mouseEntered ? {
            borderColor: '#4E66F8',
            borderWidth: 3,
            cursor: 'pointer',
          } : {
            border: '3px solid lightgrey'
          }),
        }}
      >
        <div class="card-body">
          <h6 class="card-title">{props.job.title}</h6>
          <p class="card-text">{props.job.company}</p>
          <p class="card-text">{props.job.location}</p>
        </div>
      </div>
    );
}
