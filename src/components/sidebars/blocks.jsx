import React, { useContext } from 'react';
import BlockHeader from './subBlocks/blockHeader';
import Blocks from './subBlocks/blocks';
import { BlockContext } from '../../context/miniNavContext';

const MainBlock = () => {
    let { close } = useContext(BlockContext)

    return (
        <div>
            {close && (<div><BlockHeader />
                <Blocks /></div>)}

        </div>
    );
};

export default MainBlock;