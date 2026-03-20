import { motion } from "framer-motion";

type MissionStatementProps = {
  pushUp: number | string; // depending on what you pass
};

export default function MissionStatement({ pushUp }: MissionStatementProps){
    return (
        <div>
                <p className="mission-text text-center leading-[58px] bg-gradient-to-b from-[#ffff] to-[#b4b4b4] bg-clip-text text-transparent">
          My mission is to craft pixel-perfect web experiences where clarity in
          design and strength in architecture unite to create lasting,
          meaningful digital products
          <span className="px-1 text-[#ff5757] text-7xl leading-7 whitespace-nowrap">
            .
          </span>
        </p>

        <motion.div
          style={{ marginTop: pushUp }}
          className="border border-b opacity-20 mission-border"
        />
        </div>
    )
}