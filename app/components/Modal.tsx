/* eslint-disable @typescript-eslint/no-unused-vars */
import { Payload } from "../interfaces/TokenLogger";
import "./modal.css";

export const Modal = ({
  payload
}: {
  payload: Payload;
}) => {
  const shortenInBetweenWithDotDotDot = (tokenAddress: string) => {
    const start = tokenAddress.slice(0, 6);
    const end = tokenAddress.slice(-6);
    return `${start}...${end}`;
  }
  
  return (
    <div id='modal' className="fixed w-full h-full z-10 top-0 left-0 flex items-center justify-center">
      <div className="max-w-[800px] max-h-[600px] bg-[#383a4b] w-full h-full py-2 px-3 rounded-2xl">

        <div className="w-full flex flex-col items-center justifiy-center">
          <span >Suspicious Botter/Insiders</span>
        </div>

        <div className="modal_grid_master">
          <div>
            <span>Hold Amount</span>
          </div>
          <div>
            <span>Percentage</span>
          </div>
          <div>
            <span>Owner Address</span>
          </div>
        </div>

        <div className="modal_grid_wrapper">

        {payload.botters.map((botter, index) => (
          <div key={index}>
            <div key={index} id='is_Linked' className="modal_grid">
              <span>
                {botter.holdAmount}&nbsp;
                {botter.linkedAaddress && botter.linkedAaddress.holdAmount !== 0 && (
                  <span className="text-red-300">Linked ⇩</span>
                )}
              </span>
              <span>{botter.percentage}</span>
              <span>{shortenInBetweenWithDotDotDot(botter.ownerAddress)}</span>
            </div>
              {botter.linkedAaddress && botter.linkedAaddress.holdAmount !== 0 && (
                <div className="modal_grid">
                  <span>
                    {botter.linkedAaddress.holdAmount}&nbsp;
                    <span className="text-red-300">Linked ⇧</span>
                  </span>
                  <span>{botter.linkedAaddress.percentage}</span>
                  <span>{shortenInBetweenWithDotDotDot(botter.linkedAaddress.ownerAddress)}</span>
                </div>
              )}
          </div>
        ))}
      </div>
      </div>
    </div>
  )
}