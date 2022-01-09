class Player {
  #marketPrice = 0;
  #goals = 0;

  #playerName;

  /**
   *
   * @param {string} [playerName]
   * @param {number} [marketPrice] - nepovinny parametr, defaultne nastavujeme 1000000
   */
  constructor(playerName = "Neznamy hrac", price = 500000) {
    this.#playerName = playerName;

    // this.#marketPrice = marketPrice;

    this.#setMarketPrice(price);
  }

  // getter
  getMarketPrice = function () {
    return this.#marketPrice;
  };

  /**
   * Pokud u arrow funkce vynechame slozene zavorky, pak hodnota za sipkou se rovnou vraci
   * (jako kdyby tam byl return).
   */
  // getMarketPrice = () => this.#marketPrice;

  /**
   * Pozor - arrow funkce nutne neznamena, ze vzdy vracime hodnotu.
   * Viz napr. #setMarketPrice, kde nic nevracime
   */
  // getMarketPrice = () => {
  //   console.log("Zacinam funkci");

  //   console.log(this.#marketPrice);

  //   console.log("Koncim funkci funkci");

  //   return this.#marketPrice;
  // };

  getMarketPriceWithVat = function () {
    return this.getMarketPrice() * 1.21;
  };
  // getMarketPriceWithVat = () => this.getMarketPrice() * 1.21;

  // setter
  /**
   *
   * @param {number} newMarketPrice
   */
  #setMarketPrice = (newMarketPrice) => {
    if (typeof newMarketPrice === "number") {
      if (newMarketPrice > this.#marketPrice) {
        this.#marketPrice = newMarketPrice;
      }
    }
  };
  // #setMarketPrice = function (newMarketPrice) {
  //   if (typeof newMarketPrice === "number") {
  //     if (newMarketPrice > this.#marketPrice) {
  //       this.#marketPrice = newMarketPrice;
  //     }
  //   }
  // };

  getGoals = function () {
    return this.#goals;
  };
  // getGoals = () => this.#goals;
  /**
   * Ekvivalentni zapis. U sipkove notace mohu vynechat slozene zavorky a return,
   * pokud rovnou vracim hodnotu.
   */
  // getGoals = () => {
  //   return this.#goals;
  // };

  getPlayerName = function () {
    return this.#playerName;
  };

  setPlayerName = function (newPlayerName) {
    this.#playerName = newPlayerName;
  };

  /**
   * Pridava 1 gol hraci
   */
  addGoal = () => {
    this.#goals += 1;
  };

  resetGoals = () => {
    this.#goals = 0;
  };
}

class Goalie extends Player {
  /**
   * Pozor - soukrome promenne musime vzdy definovat zde, na urovni tridy,
   * v konstruktoru lzde definovat pouze verejne promenne
   */
  #zakrok = 0;

  constructor(goaliePlayerName) {
    const goalieMarketPrice = 1000000;
    super(goaliePlayerName, goalieMarketPrice);
  }

  getZakrok = () => this.#zakrok;

  setZakrok = (zakrok) => {
    if (zakrok > this.getZakrok()) {
      this.#zakrok = zakrok;
    }
  };
}

class FieldPlayer extends Player {
  #allowedPosition = ["obrance", "utocnik", "zaloznik"];
  #position;

  constructor(fieldPlayerName, fieldPlayerMarketPrice, fieldPlayerPosition) {
    super(fieldPlayerName, fieldPlayerMarketPrice);

    this.setPosition(fieldPlayerPosition);
  }

  getPosition = () => this.#position;

  /**
   *
   * @param {string} [position] - jako defaultni hodnotu pouzivame "unknown" pro hezci vypis v konzoli
   */
  setPosition = (position = "unknown") => {
    if (this.#allowedPosition.includes(position)) {
      this.#position = position;
    } else {
      console.error(`${position} is invalid field player position.`);
    }
  };
}

class Team {
  #players = [];

  constructor(name) {
    this.name = name;
  }

  /**
   *
   * @param {Player} player
   */
  addPlayer = (player) => {
    /**
     * instanceof = "je instanci tridy a nebo je potomkem tridy"
     */
    if (!(player instanceof Player)) {
      console.error("Player is not instance of class Player!");
      // Early return
      return;
    }

    if (this.getPlayersCount() >= 11) {
      console.error("Max. number of players is 11!");
      return;
    }

    let goalieAlreadyExists = false;
    this.#players.forEach((value) => {
      if (value instanceof Goalie) {
        goalieAlreadyExists = true;
      }
    });

    if (player instanceof Goalie && goalieAlreadyExists) {
      console.error("Team can have only one goalie!");
      return;
    }

    this.#players.push(player);
  };

  getPlayersCount = () => {
    return this.#players.length;
  };

  getPlayers = () => {
    return this.#players;
  };
}

class NotAPlayer {}

/**
 * Co kdyz zaciname u obecneho hrace a pozdeji chceme na zaklade neceho rozhodnout, ze bude jineho typu?
 * Javascript tohle bohuzel v zakladu jednoduse neumi, musime napr. nahradit obsah promenny jinou instanci tridy
 * a do ni zkopirovat data.
 */
let hrac1 = new Player("Lavi", 500000);
const vysledekVyberovehoRizeniNaGolmana = true;
if (vysledekVyberovehoRizeniNaGolmana === true) {
  hrac1 = new Goalie(hrac1.getPlayerName());
} else {
  hrac1 = new FieldPlayer(
    hrac1.getPlayerName(),
    hrac1.getMarketPrice(),
    "trener"
  );
  if (typeof hrac1.getPosition() === "undefined") {
    hrac1 = null;
  }
}

console.log(hrac1);

const realMadrid = new Team("Real Madrid");
realMadrid.addPlayer(hrac1);

const hrac2 = new FieldPlayer("Horvi", 1000000, "zaloznik");
realMadrid.addPlayer(hrac2);

const nehrac = new NotAPlayer();
realMadrid.addPlayer(nehrac);

const druhyGolman = new Goalie("Petr Cech");
realMadrid.addPlayer(druhyGolman);

console.log(realMadrid);
