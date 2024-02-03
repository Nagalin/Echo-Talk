import { Badge, ListGroup } from "react-bootstrap"

const UserList = () => {
    return (
        <ListGroup >
          <ListGroup.Item
            className="d-flex justify-content-between align-items-start p-3"
          >
            <div className="ms-2 me-auto">
              <div className="fw-bold">Subheading</div>
              Cras justo odio
            </div>
            <Badge bg="primary" pill>
              14
            </Badge>
          </ListGroup.Item>
          <ListGroup.Item
            className="d-flex justify-content-between align-items-start p-3"
          >
            <div className="ms-2 me-auto">
              <div className="fw-bold">Subheading</div>
              Cras justo odio
            </div>
            <Badge bg="primary" pill>
              14
            </Badge>
          </ListGroup.Item>
          <ListGroup.Item
            className="d-flex justify-content-between align-items-start p-3"
          >
            <div className="ms-2 me-auto">
              <div className="fw-bold">Subheading</div>
              Cras justo odio
            </div>
            <Badge bg="primary" pill>
              14
            </Badge>
          </ListGroup.Item>
        </ListGroup>
      );
}

export default UserList