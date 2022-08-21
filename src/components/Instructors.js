import React from 'react'
import InstructorOverview from './InstructorOverview';

export default props => {

    return (
        <div className="text-block">
            <h5 className="mb-4">
              Instructors
            </h5>
            {props.data.map(instructor =>
                <InstructorOverview key={instructor.title} data={instructor} />
            )}
        </div>
    )
}
