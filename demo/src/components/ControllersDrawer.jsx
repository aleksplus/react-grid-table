import React, { useState } from "react";
import TableControllers from "./TableControllers";
import ColumnsControllers from "./ColumnsControllers";

const styles = {
    wrapper: {
        display: "flex",
        flexDirection: "column",
        maxWidth: 300,
        width: "100%",
        fontSize: 14,
        boxShadow:
            "0px 8px 10px -5px rgba(0,0,0,0.2), 0px 16px 24px 2px rgba(0,0,0,0.14), 0px 6px 30px 5px rgba(0,0,0,0.12)",
        zIndex: 10,
        position: "fixed",
        top: 0,
        bottom: 0,
        left: 0,
        background: "#fff",
        transition: "transform 400ms cubic-bezier(0, 0, 0.2, 1) 0ms",
    },
    title: {
        padding: "15px 20px",
        fontSize: 18,
        fontWeight: "bold",
    },
    link: {
        marginRight: 8,
        borderRadius: "50%",
        boxShadow: "0px 2px 2px 0px rgb(0 0 0 / 30%)",
        fontSize: 0,
        border: "3px solid #fff",
    },
    tabs: {
        width: "100%",
    },
    tab: {
        width: "50%",
        border: "none",
        lineHeight: "34px",
        background: "#eef2f5",
        color: "#000",
        cursor: "pointer",
        fontSize: 14,
        outline: "none",
    },
    activeTab: {
        background: "#0075ff",
        color: "#fff",
    },
    drawerToggleButton: {
        cursor: "pointer",
        position: "absolute",
        width: "40px",
        height: "40px",
        right: "-40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#fff",
        top: "14px",
        boxShadow: "5px 3px 6px 0px rgba(0,0,0,0.2)",
    },
    drawerToggleIcon: {
        fontSize: "40px",
        margin: "-10px 3px 0 0",
    },
    controllers: {
        overflow: "auto",
        flex: 1,
        padding: 20,
    },
};

const NPM_ICON = (
    <svg
        width="28px"
        height="28px"
        viewBox="0 0 256 287"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        preserveAspectRatio="xMidYMid"
    >
        <g>
            <path
                d="M7.96444444,72.3626667 L129.706667,1.47911111 L251.448889,72.3626667 L251.448889,214.016 L129.706667,284.899556 L7.96444444,214.016 L7.96444444,72.3626667 Z"
                fill="#CC0000"
            ></path>
            <path
                d="M133.12,143.132444 L246.328889,77.9377778 L250.88,209.351111 L133.12,280.462222 L133.12,143.132444 Z"
                fill="#FFFFFF"
            ></path>
            <path
                d="M248.035556,73.9555556 L247.694222,213.219556 L129.592889,281.713778 L129.024,144.839111 L248.035556,73.9555556 L248.035556,73.9555556 Z M148.707556,156.216889 L149.048889,247.694222 L188.302222,224.824889 L188.188444,155.875556 L207.985778,144.156444 L207.985778,213.333333 L227.783111,201.728 L227.896889,109.112889 L148.707556,156.216889 L148.707556,156.216889 Z"
                fill="#CC0000"
            ></path>
            <path
                d="M137.443556,2.50311111 C131.982222,-0.568888889 123.221333,-0.568888889 117.76,2.50311111 L9.89866667,64.512 C4.43733333,67.584 0.113777778,75.3208889 0.113777778,81.4648889 L0.113777778,205.482667 C0.113777778,211.740444 4.55111111,219.363556 9.89866667,222.435556 L117.76,284.444444 C123.221333,287.516444 131.982222,287.516444 137.443556,284.444444 L245.304889,222.435556 C250.766222,219.363556 255.089778,211.626667 255.089778,205.482667 L255.089778,81.4648889 C255.089778,75.2071111 250.652444,67.584 245.304889,64.512 L137.443556,2.50311111 L137.443556,2.50311111 Z M233.130667,67.3564444 C238.592,70.4284444 238.592,75.5484444 233.130667,78.6204444 L138.695111,132.892444 C133.233778,135.964444 124.472889,135.964444 119.011556,132.892444 L23.2106667,77.824 C17.7493333,74.752 17.7493333,69.632 23.2106667,66.56 L117.646222,12.288 C123.107556,9.216 131.868444,9.216 137.329778,12.288 L233.130667,67.3564444 L233.130667,67.3564444 Z M8.53333333,90.4533333 C8.53333333,84.1955556 12.9706667,81.6924444 18.3182222,84.7644444 L114.915556,140.288 C120.376889,143.36 124.700444,151.096889 124.700444,157.240889 L124.700444,267.377778 C124.700444,273.635556 120.263111,276.138667 114.915556,273.066667 L18.3182222,217.543111 C12.8568889,214.471111 8.53333333,206.734222 8.53333333,200.590222 L8.53333333,90.4533333 L8.53333333,90.4533333 Z M143.132444,271.36 C137.671111,274.432 133.347556,271.928889 133.347556,265.671111 L133.347556,157.240889 C133.347556,150.983111 137.784889,143.36 143.132444,140.288 L236.885333,86.4711111 C242.346667,83.3991111 246.670222,85.9022222 246.670222,92.16 L246.670222,200.590222 C246.670222,206.848 242.232889,214.471111 236.885333,217.543111 L143.132444,271.36 L143.132444,271.36 Z"
                fill="#910505"
            ></path>
        </g>
    </svg>
);

const GITHUB_ICON = (
    <svg
        width="26px"
        height="26px"
        viewBox="0 0 256 250"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        preserveAspectRatio="xMidYMid"
    >
        <g>
            <path
                d="M128.00106,0 C57.3172926,0 0,57.3066942 0,128.00106 C0,184.555281 36.6761997,232.535542 87.534937,249.460899 C93.9320223,250.645779 96.280588,246.684165 96.280588,243.303333 C96.280588,240.251045 96.1618878,230.167899 96.106777,219.472176 C60.4967585,227.215235 52.9826207,204.369712 52.9826207,204.369712 C47.1599584,189.574598 38.770408,185.640538 38.770408,185.640538 C27.1568785,177.696113 39.6458206,177.859325 39.6458206,177.859325 C52.4993419,178.762293 59.267365,191.04987 59.267365,191.04987 C70.6837675,210.618423 89.2115753,204.961093 96.5158685,201.690482 C97.6647155,193.417512 100.981959,187.77078 104.642583,184.574357 C76.211799,181.33766 46.324819,170.362144 46.324819,121.315702 C46.324819,107.340889 51.3250588,95.9223682 59.5132437,86.9583937 C58.1842268,83.7344152 53.8029229,70.715562 60.7532354,53.0843636 C60.7532354,53.0843636 71.5019501,49.6441813 95.9626412,66.2049595 C106.172967,63.368876 117.123047,61.9465949 128.00106,61.8978432 C138.879073,61.9465949 149.837632,63.368876 160.067033,66.2049595 C184.49805,49.6441813 195.231926,53.0843636 195.231926,53.0843636 C202.199197,70.715562 197.815773,83.7344152 196.486756,86.9583937 C204.694018,95.9223682 209.660343,107.340889 209.660343,121.315702 C209.660343,170.478725 179.716133,181.303747 151.213281,184.472614 C155.80443,188.444828 159.895342,196.234518 159.895342,208.176593 C159.895342,225.303317 159.746968,239.087361 159.746968,243.303333 C159.746968,246.709601 162.05102,250.70089 168.53925,249.443941 C219.370432,232.499507 256,184.536204 256,128.00106 C256,57.3066942 198.691187,0 128.00106,0 Z M47.9405593,182.340212 C47.6586465,182.976105 46.6581745,183.166873 45.7467277,182.730227 C44.8183235,182.312656 44.2968914,181.445722 44.5978808,180.80771 C44.8734344,180.152739 45.876026,179.97045 46.8023103,180.409216 C47.7328342,180.826786 48.2627451,181.702199 47.9405593,182.340212 Z M54.2367892,187.958254 C53.6263318,188.524199 52.4329723,188.261363 51.6232682,187.366874 C50.7860088,186.474504 50.6291553,185.281144 51.2480912,184.70672 C51.8776254,184.140775 53.0349512,184.405731 53.8743302,185.298101 C54.7115892,186.201069 54.8748019,187.38595 54.2367892,187.958254 Z M58.5562413,195.146347 C57.7719732,195.691096 56.4895886,195.180261 55.6968417,194.042013 C54.9125733,192.903764 54.9125733,191.538713 55.713799,190.991845 C56.5086651,190.444977 57.7719732,190.936735 58.5753181,192.066505 C59.3574669,193.22383 59.3574669,194.58888 58.5562413,195.146347 Z M65.8613592,203.471174 C65.1597571,204.244846 63.6654083,204.03712 62.5716717,202.981538 C61.4524999,201.94927 61.1409122,200.484596 61.8446341,199.710926 C62.5547146,198.935137 64.0575422,199.15346 65.1597571,200.200564 C66.2704506,201.230712 66.6095936,202.705984 65.8613592,203.471174 Z M75.3025151,206.281542 C74.9930474,207.284134 73.553809,207.739857 72.1039724,207.313809 C70.6562556,206.875043 69.7087748,205.700761 70.0012857,204.687571 C70.302275,203.678621 71.7478721,203.20382 73.2083069,203.659543 C74.6539041,204.09619 75.6035048,205.261994 75.3025151,206.281542 Z M86.046947,207.473627 C86.0829806,208.529209 84.8535871,209.404622 83.3316829,209.4237 C81.8013,209.457614 80.563428,208.603398 80.5464708,207.564772 C80.5464708,206.498591 81.7483088,205.631657 83.2786917,205.606221 C84.8005962,205.576546 86.046947,206.424403 86.046947,207.473627 Z M96.6021471,207.069023 C96.7844366,208.099171 95.7267341,209.156872 94.215428,209.438785 C92.7295577,209.710099 91.3539086,209.074206 91.1652603,208.052538 C90.9808515,206.996955 92.0576306,205.939253 93.5413813,205.66582 C95.054807,205.402984 96.4092596,206.021919 96.6021471,207.069023 Z"
                fill="#161614"
            ></path>
        </g>
    </svg>
);

const ControllersDrawer = ({ isOpen, onToggle, controllers }) => {
    const [tab, setTab] = useState("table");
    const drawerStyles = {
        ...styles.wrapper,
        transform: isOpen
            ? "translate3d(0, 0, 0)"
            : "translate3d(-300px, 0, 0)",
    };
    const tableTabStyles = {
        ...styles.tab,
        ...(tab === "table" ? styles.activeTab : {}),
    };
    const columnsTabStyles = {
        ...styles.tab,
        ...(tab === "columns" ? styles.activeTab : {}),
    };

    return (
        <div style={drawerStyles} className="settingsDrawer">
            <div
                style={styles.drawerToggleButton}
                onClick={() => onToggle(!isOpen)}
                className="settingsDrawerButton"
            >
                <span style={styles.drawerToggleIcon}>
                    {isOpen ? <>&lsaquo;</> : <>&rsaquo;</>}
                </span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={styles.title}>SETTINGS</span>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        padding: "0 20px",
                    }}
                >
                    <a
                        href="https://github.com/aleksplus/react-grid-table"
                        style={styles.link}
                        title="Github"
                    >
                        {GITHUB_ICON}
                    </a>
                    <a
                        href="https://www.npmjs.com/package/@p.aleks/react-grid-table"
                        style={styles.link}
                        title="NPM"
                    >
                        {NPM_ICON}
                    </a>
                </div>
            </div>
            <div style={styles.tabs}>
                <button onClick={() => setTab("table")} style={tableTabStyles}>
                    Table
                </button>
                <button
                    onClick={() => setTab("columns")}
                    style={columnsTabStyles}
                >
                    Columns
                </button>
            </div>
            <div style={styles.controllers}>
                {tab === "table" ? (
                    <TableControllers controllers={controllers} />
                ) : (
                    <ColumnsControllers controllers={controllers} />
                )}
            </div>
        </div>
    );
};

export default ControllersDrawer;
