import React from "react";
import { Modal, ModalBody } from "reactstrap";
import {
  FacebookShareButton,
  LinkedinShareButton,
  PinterestShareButton,
  RedditShareButton,
  TwitterShareButton,
  FacebookIcon,
  LinkedinIcon,
  PinterestIcon,
  RedditIcon,
  TwitterIcon,
} from "react-share";

const ShareButtonsModal = ({ modal, toggle, shareUrl }) => (
  <div>
    <Modal isOpen={modal} toggle={toggle} className="text-center">
      <ModalBody>
        <div class="d-flex justify-content-center">
          <div class="p-2">
            <FacebookShareButton url={shareUrl}>
              <FacebookIcon size={40} round />
            </FacebookShareButton>
          </div>
          <div class="p-2">
            <TwitterShareButton url={shareUrl}>
              <TwitterIcon size={40} round />
            </TwitterShareButton>
          </div>
          <div class="p-2">
            <LinkedinShareButton url={shareUrl}>
              <LinkedinIcon size={40} round />
            </LinkedinShareButton>
          </div>
          <div class="p-2">
            <PinterestShareButton url={shareUrl}>
              <PinterestIcon size={40} round />
            </PinterestShareButton>
          </div>
          <div class="p-2">
            <RedditShareButton
              url={shareUrl}
              windowWidth={660}
              windowHeight={460}
            >
              <RedditIcon size={40} round />
            </RedditShareButton>
          </div>
        </div>
      </ModalBody>
    </Modal>
  </div>
);

export default ShareButtonsModal;
