// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TarotGame {
    // Define the Tarot card structure
    struct Card {
        string name;
        uint8 number;
        string suit;
    }

    // Array to hold the deck of Tarot cards
    Card[] private deck;

    // Mapping to track drawn cards
    mapping(address => Card[]) private drawnCards;

    // Event for when a card is drawn
    event CardDrawn(address indexed player, string name, uint8 number, string suit);

    // Initialize the deck with major and minor arcana
    constructor() {
        initializeDeck();
    }

    // Function to initialize the Tarot deck
    function initializeDeck() internal {
        // Major Arcana
        string[22] memory majorArcana = [
            "The Fool", "The Magician", "The High Priestess", "The Empress", "The Emperor", 
            "The Hierophant", "The Lovers", "The Chariot", "Strength", "The Hermit",
            "Wheel of Fortune", "Justice", "The Hanged Man", "Death", "Temperance",
            "The Devil", "The Tower", "The Star", "The Moon", "The Sun",
            "Judgement", "The World"
        ];
        for (uint8 i = 0; i < majorArcana.length; i++) {
            deck.push(Card(majorArcana[i], i, "Major Arcana"));
        }

        // Minor Arcana suits
        string[4] memory suits = ["Cups", "Pentacles", "Swords", "Wands"];
        for (uint8 s = 0; s < suits.length; s++) {
            for (uint8 n = 1; n <= 14; n++) {
                string memory cardName = string(abi.encodePacked(suits[s], " ", uint2str(n)));
                deck.push(Card(cardName, n, suits[s]));
            }
        }

        shuffleDeck();
    }

    // Function to shuffle the deck
    function shuffleDeck() internal {
        for (uint256 i = 0; i < deck.length; i++) {
            uint256 n = i + uint256(keccak256(abi.encodePacked(block.timestamp))) % (deck.length - i);
            Card memory temp = deck[n];
            deck[n] = deck[i];
            deck[i] = temp;
        }
    }

    // Function to draw a card from the deck
    function drawCard() public {
        require(deck.length > 0, "No more cards in the deck");
        Card memory drawnCard = deck[deck.length - 1];
        deck.pop();
        drawnCards[msg.sender].push(drawnCard);
        emit CardDrawn(msg.sender, drawnCard.name, drawnCard.number, drawnCard.suit);
    }

    // Function to get drawn cards of a player
    function getDrawnCards(address player) public view returns (Card[] memory) {
        return drawnCards[player];
    }

    // Helper function to convert uint to string
    function uint2str(uint256 _i) internal pure returns (string memory _uintAsString) {
        if (_i == 0) {
            return "0";
        }
        uint256 j = _i;
        uint256 len;
        while (j != 0) {
            len++;
            j /= 10;
        }
        bytes memory bstr = new bytes(len);
        uint256 k = len;
        while (_i != 0) {
            k = k - 1;
            uint8 temp = (48 + uint8(_i - _i / 10 * 10));
            bytes1 b1 = bytes1(temp);
            bstr[k] = b1;
            _i /= 10;
        }
        return string(bstr);
    }
}
