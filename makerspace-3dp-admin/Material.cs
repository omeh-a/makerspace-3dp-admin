using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace makerspace_3dp_admin
{
    /// <summary>
    /// This class represents a given combination of material and machine
    /// properties for a given job. This includes a description of the 
    /// manufacture process to be used, material, colours and other key
    /// information for Makerspace staff.
    /// </summary>
    internal class Material
    {
        private TechType techType;
        private MaterialType materialType;
        private string colour;
        private string info; // Special properties - e.g. TPU flexibility level OR desc. of nonstandard mat
        private bool colourCanBeSubstituted;

        public Material(TechType tech, MaterialType mat, string colour, string info, bool colourSub)
        {
            this.techType = tech;
            this.materialType = mat;
            this.colour = colour;
            this.info = info;
            this.colourCanBeSubstituted = colourSub;
        }

        private bool isColourSubstitutable() { return colourCanBeSubstituted; }

        private string getColour() { return colour; } 

        private TechType getTechType() { return techType; }

        private MaterialType GetMaterialType() { return materialType; }

        private string getInfo() { return info; }

        /// <summary>
        /// Returns a relatively safe suggestion of what machine should be
        /// used given this Material.
        /// </summary>
        /// <returns></returns>
        public string whatPrinter()
        {
            switch (techType)
            {
                case TechType.FDM:
                    if (this.materialType == MaterialType.PLA || this.materialType == MaterialType.PETG)
                        return ("Ultimaker2/3/S5");
                    else if (this.materialType == MaterialType.TPU)
                        return ("Creality CR10");
                    else if (this.materialType == MaterialType.Onyx)
                        return ("MarkForged X7");
                    else { return ("Ask Gabo"); }
 
                case TechType.CFF:
                    return ("MarkForged X7");

                case TechType.SLA:
                    return ("Any resin printer w/ correct resin");

                case TechType.MFF:
                    return ("MarkForged MetalX");
                
                default:
                    return ("May not be printable at this makerspace");
            }
        }

        public string toString()
        {
            return $"{this.techType}/{this.materialType}";
        } 
    }

    internal enum TechType
    {
        FDM, SLA, CFF, MFF, SLS, UNKNOWN
    }

    internal enum MaterialType
    {
        PLA, PETG, TPU, Onyx, FDM_other,    // FDM
        Onyx_Glass, Onyx_Carbon,            // CFF - only include Onyx with fibres
        Resin_Durable, Resin_Clear, Resin_Flex, Resin_Elastic, // SLA
        METAL,                              // MFF/SLS. Included for futureproofing
        UNKNOWN,
    }
}
