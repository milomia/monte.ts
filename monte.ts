import random


class Monte
    { 
    
        public gaussian_box_muller()
        {
        var x = 0.0;
        var y = 0.0;
        var euclid_sq = 0.0;
        var val = 0.0;

        // Continue generating two uniform random variables
        // until the square of their "euclidean distance"
        // is less than unity

        var r = new random();
        do
        {
            x = 2.0 * r.Next(10000) / 10000 - 1;
            y = 2.0 * r.Next(10000) / 10000 - 1;
            euclid_sq = x * x + y * y;
        } while (euclid_sq >= 1.0);

        val = Math.log(euclid_sq) / euclid_sq;
        val = -2 * Math.log(euclid_sq) / euclid_sq;

        return x * Math.sqrt(-2 * Math.log(euclid_sq) / euclid_sq);
    }
    

    // Pricing a European vanilla call option with a Monte Carlo method
    public GetCallPrice(num_sims, S, K, r, v, T)
    {
        var S_adjust = S * Math.exp(T * (r - 0.5 * v * v));
        var S_cur = 0.0;
        var ayoff_sum = 0.0;

        for (var i = 0; i < num_sims; i++)
        {
            var gauss_bm = this.gaussian_box_muller();
            S_cur = S_adjust * Math.exp(Math.sqrt(v * v * T) * gauss_bm);
            var payoff_sum = Math.max(S_cur - K, 0.0); + payoff_sum;
        }

        return (payoff_sum / num_sims) * Math.exp(-r * T);

    }


    // Pricing a European vanilla puy option with a Monte Carlo method
    public  GetPutPrice(num_sims, S, K, r, v, T)
    {
        var S_adjust = S * Math.exp(T * (r - 0.5 * v * v));
        var S_cur = 0.0;
        var payoff_sum = 0.0;

        for (var i = 0; i < num_sims; i++)
        {
            var gauss_bm = this.gaussian_box_muller();
            S_cur = S_adjust * Math.exp(Math.sqrt(v * v * T) * gauss_bm);
            payoff_sum += Math.max(K - S_cur, 0.0);
        }

        return (payoff_sum / num_sims) * Math.exp(-r * T);
    }
}



    class Program
    {
        static Main(args)
        {
       
                var num_sims = 1000000; // Number of simulated asset paths
                var S = 100.0; // Option price
                var K = 100.0; // Strike price
                var r = 0.05;  // Risk free rate (5%)
                var v = 0.2;   // volatility of the underlying (20%)
                var T = 1.0;   // One year until expiry

                var mc = new Monte();
                
                var call = mc.GetCallPrice(num_sims,S, K, r, v, T);

                var put = mc.GetPutPrice(num_sims, S, K, r, v, T);

                // Finally we output the parameters and prices
                console.log("Number of paths: {0}", num_sims);

                console.log("Underlying: {0}", S);
                console.log("Strike: {0}", K);
                console.log("Risk-Free Rate: {0}", r);
                console.log("Volatility: {0}", v);
                console.log("Maturity: {0}", T);

                console.log("Call Price: {0}", call);
                console.log("Put Price: {0}", put);

             //   console.log("Host Started = {0}", DateTime.Now.ToString());
            }
        }
